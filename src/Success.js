import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Success.css";

function Success() {
  const navigate = useNavigate();
  const handleClick = (async) => {
    navigate("/orders");
  };
  return (
    <div>
      <Header />
      <div className="success">
        <div className="checbox-message">
          <img
            src="https://p7.hiclipart.com/preview/1003/775/594/check-mark-computer-icons-clip-art-check-mark-png-file-images-circle.jpg"
            alt=""
          />
          Thank you, your order has been Confirmed!
        </div>
        <div className="thanks-text">
          Thank you for shopping with us. We'll send a confirmation once your
          item has shipped, if you would like to check the status of your
          order(s), please press the link below
          <button className="goto-order" onClick={handleClick}>
            Go to my orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
