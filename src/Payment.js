import React, { useEffect } from "react";
import Header from "./Header";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { auth, db } from "./firebase";
import { collection, query, getDocs, addDoc, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Payment = () => {
  const [user] = useAuthState(auth);
  const [{ basket }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState();
  const [details, setDetails] = useState([]);

  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  console.log(details);
  useEffect(() => {
    const userData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setDetails(data);
    };
    userData();
  }, [user]);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);
  console.log("👱", user);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        try {
          addDoc(collection(db, "users", user.uid, "orders"), {
            id: paymentIntent.id,
            basket: basket,
            amount: paymentIntent.amount / 100,
            created: paymentIntent.created,
          });
        } catch (error) {
          console.error(error);
          alert(error);
        }
      });
    setSucceeded(true);
    setError(null);
    setProcessing(false);
    navigate("/success");

    dispatch({
      type: "EMPTY_BASKET",
    });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div>
      <Header />
      <div className="payment">
        <div className="payment-container">
          <h1>
            {" "}
            <Link to="/checkout">Checkout ({basket?.length} Items) </Link>
          </h1>

          <div className="payment-section">
            <div className="payment-title">
              <h3>Delivery Address</h3>
            </div>

            <div className="payment-address">
              {details.map((user) => {
                return (
                  <div className="userDetails">
                    <p className="user-d">{user.name}</p>
                    <p className="user-d">{user.address}</p>
                    <p className="user-d">
                      Contact Number: {user.mobileNumber}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="payment-section">
            <div className="payment-title">
              <h3>Review items and Delivery</h3>
            </div>
            <div className="payment-items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          <div className="payment-section">
            <div className="payment-title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment-details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment-price-container">
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <h3>Order total : {value}</h3>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  <button
                    disabled={processing || disabled || succeeded}
                    onSubmit={handleSubmit}
                  >
                    {processing ? <span>Processing</span> : "Buy Now"}
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
