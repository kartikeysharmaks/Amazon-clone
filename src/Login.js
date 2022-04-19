import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth, signInWithGoogle, logIn } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  if(error) alert(error);
  
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="login">
      <Link to="/">
        <img
          className=" login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>{" "}
      <div className="login-container">
        <div className="login-heading"> Sign-In </div>{" "}
      
        <div className="property"> E-mail </div>{" "}
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
        <button className="login-in-button" onClick={logIn}>
          {" "}
          Sign In{" "}
        </button>{" "}
        <Link to="/forgot" className="forgot">
          forgot Password ?
        </Link>{" "}
        <span className="terms">
          <input type="checkbox" className="login-checkbox" />
          By signing - in you agree to Amazon's Fake Clone Conditions of Use &
          sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice{" "}
        </span>{" "}
        <div className="already">Don't have an Account? </div>{" "}
        <Link to="/sign-up">
          <button className="login-register-in-button">
            {" "}
            Create Your Amazon Account{" "}
          </button>{" "}
        </Link>{" "}
        <button className="google-button" onClick={signInWithGoogle}>
          Login with Google Account{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};

export default Login;
