import React from 'react';
import './ServicePage.css';

const ServicePage = () => {
  return (
    <>
    <div className='bg-image '></div>
    <div className="service-page">
      <h1 className="service-page-title">Our Services</h1>
      <div className="service-content">
        <div className="service-item">
          <i className="fa fa-shopping-cart service-icon" />
          <h2 className="service-title">Sell Products</h2>
          <p className="service-description">Start earning by selling your high-quality products to our global customer base. Showcase your items and reach millions of potential buyers through our secure and user-friendly platform.</p>
        </div>
        <div className="service-item">
          <i className="fa fa-credit-card service-icon" />
          <h2 className="service-title">Buy Products</h2>
          <p className="service-description">Discover a wide range of top-notch products from trusted sellers. Shop with confidence, knowing that we prioritize quality and provide a seamless shopping experience. Find the perfect items that meet your needs and preferences.</p>
        </div>
        <div className="service-item">
          <i className="fa fa-wrench service-icon" />
          <h2 className="service-title">On-Demand Services</h2>
          <p className="service-description">Get access to a variety of on-demand services tailored to your requirements. From professional home cleaning to skilled handymen, our platform connects you with reliable service providers. Enjoy convenience and quality assistance with just a few clicks.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServicePage;
