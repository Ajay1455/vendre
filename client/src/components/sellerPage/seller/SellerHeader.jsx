import React, { useEffect, useState } from "react";
import "./SellerHeader.css";
import { NavLink } from "react-router-dom";

function SellerHeader() {
  const [sellers, setSellers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("https://vendrebackend.vercel.app/server/sellers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSellers(data);
      })
      .catch((error) => {
        console.log("Error fetching sellers:", error);
      });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sellers.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sellers.length - 1 : prevSlide - 1));
  };

  return (
    <div className="Sellerheader">
      {sellers.length > 0 && (
        <>
          <button className="slide-btn prev" onClick={prevSlide}>
            Prev
          </button>
          <div className="seller-card">
            <NavLink to="/sellerprofile" state={{ data: sellers[currentSlide] }}>
              <img
                src={sellers[currentSlide].user.avatar}
                alt="Profile Pic"
                className="profilePic"
              />
              <div className="info">
                <h1>
                  {sellers[currentSlide].user.firstName} {sellers[currentSlide].user.lastName}
                </h1>
                <p>{sellers[currentSlide].brand}</p>
              </div>
            </NavLink>
          </div>
          <button className="slide-btn next" onClick={nextSlide}>
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default SellerHeader;
