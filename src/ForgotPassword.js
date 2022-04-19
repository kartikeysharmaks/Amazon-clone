import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { auth, sendPasswordReset } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="forgot-password">
      <Link to="/">
        <img
          className=" forgot-password-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="forgot-password-container">
        <div className="forgot-password-title">Sign-In</div>
        {error && (
          <div className="error-title">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <div className="property">E-mail</div>{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="forgot-password-button"
          onClick={sendPasswordReset}
          disabled={loading}
        >
          {" "}
          Reset Password{" "}
        </button>
        <div className="login-link-title">
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </div>
      <div className="sign-up-title">
        Need an account?{" "}
        <Link to="/sign-up" className="sign-up-link">
          Sign-up
        </Link>{" "}
      </div>
    </div>
  );
};
