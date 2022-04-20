import React from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, db } from "./firebase";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

const Header = () => {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);

  const handleClick = (async) => {
    navigate("/login");
  };

  const handleSubmit = async =>
  {
    if(!user){
      alert("Please Login First");
      navigate("/login");
    } 
    if(user) navigate("/checkout");
  }

  const handleClickSubmit = (async) => {
    navigate("/orders");
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, navigate]);

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon"
            className="logo-image"
          />
        </Link>{" "}
      </div>{" "}
      <div className="search-input-bar">
        <input type="text" placeholder="" className="input-box" />
         <img src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png" alt="search" className="search-icon" />
      </div>{" "}
      <div className="Navbar">
        <div className="navbar-item">
          {" "}
          {user && <div className="small-text"> Hello {name} </div>}{" "}
          {!user && <div className="small-text"> Hello Guest </div>}{" "}
          {!user && (
            <div className="large-text" onClick={handleClick}>
              {" "}
              Sign in{" "}
            </div>
          )}{" "}
          {user && (
            <div className="large-text" onClick={logout}>
              {" "}
              Log out{" "}
            </div>
          )}{" "}
        </div>{" "}
        {""}{" "}
        <div className="navbar-item">
          <div className="small-text"> Request </div>{" "}
          <div className="large-text" onClick={handleClickSubmit}> & Orders </div>{" "}
        </div>{" "}
        <div className="navbar-item">
          <div className="small-text"> Your </div>{" "}
          <div className="large-text"> Prime </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="header-wishlist">
        <Link to="/checkout">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShmtIlk8qJFYpNGY34N3lYlgyML2fsxWa4eAKD6Y1ehH4LWbAVv-4f10eLB7-EG6VnOR8&usqp=CAU" alt="" className="basket-icon" onClick={handleSubmit}/>
        </Link>{" "}
        <span className="items-in-basket"> {basket?.length} </span>{" "}
      </div>{" "}
    </div>
  );
};
export default Header;
