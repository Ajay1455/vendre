import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
import wallpaper from "../images/wallpaper.jpg";
import { AuthContext } from "../../authContext/AuthContext";
import {login} from '../../authContext/ApiCalls'

const Login = () => {

  const {dispatch} = useContext(AuthContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const fun1 = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    login({data}, dispatch);
  };

  return (
    <div className="base" style={{ backgroundImage: `url(${wallpaper})` }}>
      <div id="innerBox">
        <h1 className="h1">Log In</h1>
        <form id="form">
          <input className="loginInput"
            type="text"
            onChange={fun1}
            name="email"
            value={data.email}
            placeholder="Email"
            required
          />{" "}
          <br />
          <input className="loginInput"
            type="password"
            onChange={fun1}
            name="password"
            value={data.password}
            placeholder="Password"
            required
          />{" "}
          <br />
          <button className="loginbtn registerbtn" onClick={handleChange}> Login</button>
        </form>
        <span>
          New here? <NavLink to="/register">Create Account</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Login;
