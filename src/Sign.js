import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sign.css";
import { auth, registerWithEmail, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [age, setAge] = useState("");
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter your Name");
    if (!email) alert("Please enter your E-mail");
    if (!password) alert("Please enter the password");
    if (!mobileNumber) alert("Please enter your Mobile Number");
    if (!address) alert("Please enter your Address");
    if (error) alert(error);
    registerWithEmail(name, email, password, mobileNumber, address, age);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="sign-up">
      <Link to="/">
        <img
          className=" sign-up-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>{" "}
      <div className="sign-up-container">
        <div className="sign-up-heading"> Sign - Up </div>{" "}
        <div className="property"> Name: </div>{" "}
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
        />{" "}
        <div className="property"> Age: </div>{" "}
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />{" "}
        <div className="property"> Address: </div>{" "}
        <input
          type="text"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />{" "}
        <div className="property"> Mobile Number: </div>{" "}
        <input
          type="number"
          onChange={(event) => {
            setMobileNumber(event.target.value);
          }}
        />{" "}
        <div className="property"> E - mail </div>{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <div className="property"> Password </div>{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <p className="terms">
          {" "}
          <input type="checkbox" className="sign-up-checkbox" />
          By signing - in you agree to Amazon 's Fake Clone Conditions of Use &
          sale.Please see our Privacy Notice, our Cookies Notice and our
          Interest - Based Ads Notice{" "}
        </p>{" "}
        <button className="sign-up-button" type="submit" onClick={register}>
          {" "}
          Create Your Amazon Account{" "}
        </button>{" "}
        <button
          className="login-button"
          type="submit"
          onClick={signInWithGoogle}
        >
          {" "}
          Sign In With Google{" "}
        </button>{" "}
        <div className="already">
          {" "}
          Already have an Account ?{" "}
          <Link to="/login" className="login-link">
            {" "}
            Login{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Sign;
