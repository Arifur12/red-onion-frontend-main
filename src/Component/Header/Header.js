import React, { useContext } from "react";
import logo2 from "../../image/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../CartContext/Cart";
import { Link } from "react-router-dom";
import Auth from "../../use.auth";
import "./Header.css";
const Header = () => {
  const [cart, setCart] = useContext(CartContext);
  const auth = Auth();
  const signOutBtn = () => {
    auth.signOut().then((res) => {
      auth.user = null;
      localStorage.removeItem("user");
      window.location.pathname = "/";
    });
  };
  console.log(auth.user);
  return (
    <div className="header-container">
      <Link to="/">
        <img src={logo2} alt="logo2" />
      </Link>
      <div className="header-box">
        <Link to="/delivery" style={{ color: "red" }}>
          <span className="mr-3">
            <FontAwesomeIcon icon={faShoppingCart} />
            {cart.length}
          </span>
        </Link>
        {auth.user ? (
          <span className="header-box">
            <h5 className="user-name">{auth.user.name}</h5>
            <button className="btn btn-danger ml-2" onClick={signOutBtn}>
              Sign Out
            </button>
          </span>
        ) : (
          <span className="header-box">
            <Link to="/login" className="mr-2">
              Login
            </Link>
            <Link to="/login" className="btn btn-danger ml-md-3">
              Sign Up
            </Link>
          </span>
        )}
        {auth?.user?.email === "arif@gmail.com" && (
          <Link to="/admin" className="btn btn-primary admin_btn">
            Admin
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
