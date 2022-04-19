import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import Header from "./Header";
import Footer from "./Footer";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Checkout = () => {
  const [{ basket }] = useStateValue();
  const [user] = useAuthState(auth);
  return (
    <>
      <Header />
      <div className="checkout">
        <div className="checkout-banner">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
            className="banner-image"
          />
        </div>{" "}
        <div className="username-label">Hello {user?.email}!</div>
        <div className="checkout-options">
          <div className="checkout-left">
            <h1 className="checkout-left-title"> Your Shopping Basket </h1>{" "}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}{" "}
          </div>{" "}
          <div className="checkout-right">
            <Subtotal />
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <Footer/>
    </>
  );
};

export default Checkout;
