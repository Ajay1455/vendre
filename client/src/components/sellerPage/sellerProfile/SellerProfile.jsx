import React, { useEffect } from "react";
import "./SellerProfile.css";
import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();
  const info = location.state.data;
  return (
    <div className="products">
      <div className="product-grid">
        {info.products.slice(0, 4).map((product) => (
          <div className="product" key={product.id}>
            <img
              className="productimgsPro"
              src={product.imageUrl}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SellerProfile = () => {
  const location = useLocation();
  const info = location.state.data;

  useEffect(() => {
    console.log(info);
    return () => {};
  }, []);

  return (
    <div className="seller-profile">
      <div className="profile-header">
        <img
          height={40}
          className="profile-pic"
          src={info.user.avatar}
          alt=""
        />
        <div className="profile-infor">
          <h2 className="seller-name">
            {info.user.firstName} {info.user.lastName}
          </h2>
          <p className="company-name">{info.brand}</p>
          <p className="company-name">Followers {info.followersCount}</p>
        </div>
      </div>
      <div className="profile-body">
        <div className="success-story">
          <h3 className="story-title">Success Story</h3>
          <p className="story-content">{info.successStory}</p>
        </div>
        <div className="product-sold">
          <h3 className="sold-title">Products </h3>
          <ul className="sold-list">
            <Products />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
