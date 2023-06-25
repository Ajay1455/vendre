import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../images/BlueLogo.png";

function Navbar({ isLogin, user }) {
  const [click, setClick] = useState(false);
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleProfile = () => {
    location.pathname = '/profile';
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={logo} alt="" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/service" className="nav-links" onClick={closeMobileMenu}>
                Service
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/aboutus" className="nav-links" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contactUs" className="nav-links" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              {isLogin ? (
                <div
                  className="nav-links"
                  onClick={handleProfile}
                  style={{cursor:"pointer"}}
                >
                  Hey, {user}
                </div>
              ) : (
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
