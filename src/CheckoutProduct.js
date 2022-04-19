import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [{ basket }, dispatch] = useStateValue();
  console.log("The basket is >>>" + basket);

  const removeFromBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "REMOVE_FROM_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="checkout-product">
      <div className="checkout-product-image">
        <img src={image} alt={id} className="cp-img" />
      </div>{" "}
      <div className="checkout-product-info">
        <div className="checkout-product-title"> {title} </div>{" "}
        <div className="checkout-product-price">
          <div> ₹ </div> <strong> {price} </strong>
        </div>{" "}
        <div className="checkout-product-rating">
          {" "}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p> ⭐ </p>
            ))}{" "}
        </div>{" "}
        {!hideButton && ( <button className="checkout-product-button" onClick={removeFromBasket}>
          Remove from Basket
        </button>)}
      </div>{" "}
    </div>
  );
};

export default CheckoutProduct;
