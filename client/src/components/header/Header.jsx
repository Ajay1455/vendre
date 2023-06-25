import React from 'react'
import './Header.css'
import headerimg from '../images/Header_img.png'
import { useNavigate } from 'react-router-dom'
function Header() {
  const navigate=useNavigate()
  const handle=()=>{
    navigate('/products')
  }
  return (
    <div className="header">
      <img src={headerimg} className='headerimg' alt="Header Image" />
      <div className="header-text">
        <h1>Welcome to Our Website</h1>
        <h2>We offer the best products and services</h2>
        <button onClick={handle}>Get Started</button>
      </div>
    </div>
  );
}

export default Header;
