import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

const Product = ({ id, title, price, rating, image }) => {
  const [{ basket }, dispatch] = useStateValue();
  console.log("This is the basket >>> ", basket);

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
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
    <div className="product">
      <div className="product-info">
        <div className="product-title"> {title} </div>{" "}
        <div className="product-price">
          <small> ₹ </small> <strong> {price} </strong>{" "}
        </div>{" "}
        <div className="product-rating">
          {" "}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p> ⭐ </p>
            ))}{" "}
        </div>{" "}
      </div>{" "}
      <img src={image} alt="product" className="product-image" />
      <button className="product-button" onClick={addToBasket}>
        {" "}
        Add to Basket{" "}
      </button>{" "}
    </div>
  );
};

export default Product;
