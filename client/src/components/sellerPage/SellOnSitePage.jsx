import React, { useContext } from 'react';
import './SellOnSitePage.css';
import SellerHeader from './seller/SellerHeader';
import {AuthContext} from '../../authContext/AuthContext'

const SellOnSitePage = () => {
  const {user}=useContext(AuthContext)
  return (
    <div className="container">
      <h1 className="sellHeader">How to Sell Your Product on Our Site</h1>
      <div className="section">
        <h2 className="section-header">Seller's Profiles</h2>
        <p>Get to know our top sellers and learn from their success stories.</p>
        <div className="top-sellers-container">
         <SellerHeader/>
        </div>
      </div>
      {user.isSeller ? (
      <div className="section">
        <h2 className="section-header">Sell Your Products</h2>
        <p>Fill out the form below to sell your products on our site:</p>
        <form className="sell-form">
          <label className='sellerFormlabel' htmlFor="product-name">Product Name:</label>
          <input className='sellerformInputs' type="text" id="product-name" name="product-name" />
          <label className='sellerFormlabel' htmlFor="product-description">Product Description:</label>
          <textarea className='sellerformInputs' id="product-description" name="product-description"></textarea>
          <label className='sellerFormlabel' htmlFor="product-price">Product Price:</label>
          <input className='sellerformInputs' type="number" id="product-price" name="product-price" />
          <button className='sellBtn' type="submit">Submit</button>
        </form>
      </div>
      ):(
        <h1>Sorry you are not seller create new account with seller role.</h1>
      )}
    </div>
  );
};

export default SellOnSitePage;
