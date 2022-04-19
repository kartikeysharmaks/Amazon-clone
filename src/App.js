import React from "react";
import "./App.css";
import Checkout from "./Checkout";
import Home from "./Home";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Sign from "./Sign";
import ProtectedRoute from "./ProtectedRoutes";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ForgotPassword from "./ForgotPassword";
import Success from "./Success";
import Orders from "./Orders";

const stripeTestPromise = loadStripe(
  "pk_test_51Kj164SJqq7Rs9NE3nQ5g6KWVjdJ7YCHmQjKKVwbyfUyOWxgz88nFx02gcigdhWFt5FVaLuIq6mGHmWZJczUGoBH00VXVDzQhX"
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<Sign />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/" element={<Home />} />{" "}
        <Route path="/forgot" element={<ForgotPassword />} />{" "}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Elements stripe={stripeTestPromise}>
                <Payment />
              </Elements>{" "}
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/success"
          element={
              <Success />
          }
        />
         <Route
          path="/orders"
          element={
              <Orders />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
