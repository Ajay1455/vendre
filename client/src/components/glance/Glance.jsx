import React from "react";
import "./Glance.css";

const Glance = ({ title, price, image, onClick }) => {

  return (
    <div className="glance" onClick={onClick}>
      <div className="glance-image">
        <img src={image} alt={title} />
      </div>
      <div className="glance-info">
        <h3>{title}</h3>
        <h4>₹{price}</h4>
      </div>
    </div>
  );
};

export default Glance;
