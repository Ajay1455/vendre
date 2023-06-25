import React, { useEffect, useState } from "react";
import "./Confirmation.css";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useLocation } from "react-router-dom";

function Confirmation() {
  let location = useLocation();
  const product = location.state.from;
  const total = location.state.totalPr;

  const [orderId, setOrderId]=useState("");
  useEffect(() => {
    setOrderId(uuidv4());
  }, []);
  return (
    <div className="confirmation-container">
      <h1 className="confirmation-title">Order Confirmed</h1>
      <p className="confirmation-subtitle">
        Your order has been placed successfully
      </p>
      <div className="order-details">
        <h2 className="order-details-title">Order Details</h2>
        <div className="order-details-content">
          <p>
            <strong>Order Number:</strong>
            {orderId}
          </p>
          <p>
            <strong>Estimated Delivery Time:</strong> 30 minutes
          </p>
          <p>
            We would like to inform you that the delivery details will be shared
            on your registered email address. Please ensure that you check your
            email inbox and spam folder for further updates on your delivery. If
            you have any questions or concerns regarding your order, please feel
            free to reach out to us at <b>Vandre@business.in</b>. Thank you for choosing
            <b> Vandre</b>.
          </p>
          <p>
            <strong>Items Ordered:</strong>
          </p>
          <ul className="order-items">
            {product.map((item) => {
              return <li>{item.title}</li>;
            })}
          </ul>
          <p>
            <strong>Total Cost:</strong> ₹{total}
          </p>
          {/* <p><strong>Special Instructions:</strong> Please call when you arrive</p> */}
        </div>
      </div>
      <NavLink to="/products">
        <button className="continue-button">Continue Shopping</button>
      </NavLink>
    </div>
  );
}

export default Confirmation;
