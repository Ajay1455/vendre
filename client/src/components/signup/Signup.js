import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import signimg from "../images/signimg.jpg";
import wallpaper from "../images/wallpaper.jpg";
import { register } from "../../authContext/ApiCalls";
import { AuthContext } from "../../authContext/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);

  const handleSellerChange = (event) => {
    const value = event.target.value === "seller";
    setInput((prevInput) => ({
      ...prevInput,
      isSeller: value,
    }));
    setIsSeller(value);
  };
  

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const {dispatch} = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      ...input,
      isSeller: isSeller,
    };

    register({requestData},dispatch);
    navigate('/login');
  };

  return (
    <div id="base1">
      <img id="background" src={wallpaper} alt="" />
      <div id="inner">
        <div id="frame">
          <div id="image">
            <img src={signimg} alt="" />
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <h1 style={{ fontSize: "40px" }}>Sign Up</h1>
            <br />
            <input
              className="registerInput"
              type="text"
              placeholder="First Name"
              onChange={handleInputChange}
              name="firstName"
              value={input.firstName}
              required
            />
            <br />
            <input
              className="registerInput"
              type="text"
              onChange={handleInputChange}
              name="lastName"
              value={input.lastName}
              placeholder="Last name"
              required
            />
            <br />
            <input
              className="registerInput"
              type="email"
              onChange={handleInputChange}
              name="email"
              value={input.email}
              placeholder="Email"
              required
            />
            <br />
            <input
              className="registerInput"
              type="password"
              onChange={handleInputChange}
              name="password"
              value={input.password}
              placeholder="Enter password"
              required
            />
            <br />
            <label style={{ margin: "0" }}>Want to Sell Products?</label>

            <label style={{ fontSize: "10px", display: "inline", margin: "0" }}>
              <input
                type="radio"
                value="seller"
                checked={isSeller}
                onChange={handleSellerChange}
              />
              Yes
            </label>
            <br />
            <button className="registerbtn" type="submit">
              Submit
            </button>
            <Link to="/login">
              <span>Already have an account</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
