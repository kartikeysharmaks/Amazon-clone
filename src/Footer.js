import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer-title">
        <h3 className="heading"> Get To Know Us </h3>{" "}
        <div className="footer-options">
          {" "}
          <p> Careers </p> <p> Blog </p> <p> About Amazon </p>{" "}
          <p> Amazon Devices </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="Footer-title">
        <h3 className="heading"> Make Money With Us </h3>{" "}
        <div className="footer-options">
          <p> Sell on Amazon </p> <p> Sell on Amazon Business </p>{" "}
          <p> Sell Your Apps on Amazon </p> <p> Become an Affiliate </p>{" "}
          <p> Advertise your Products </p> <p> Self - Publish with Us </p>{" "}
          <p> Host an Amazon Hub </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="Footer-title">
        <h3 className="heading"> Amazon Payments Products </h3>{" "}
        <div className="footer-options">
          <p> Amazon Business Card </p> <p> Shop with Points </p>{" "}
          <p> Reload Your Balance </p> <p> Amazon Currency Converter </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="Footer-title">
        <h3 className="heading"> Let Us Help You </h3>{" "}
        <div className="footer-options">
          {" "}
          <p> Your Orders </p> <p> Shipping Rates & Policies </p>{" "}
          <p> Return & Replacements </p> <p> Amazon Devices </p> <p> Help </p>{" "}
          <p> Contact </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Footer;
