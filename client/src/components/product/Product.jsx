import React, { useContext, useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import "./Product.css";
import { AuthContext } from "../../authContext/AuthContext";

export const handleCartButtonClick = (
  isInCart,
  cartbtn,
  setIsInCart,
  onAdd,
  product
) => {
  if (isInCart) {
    cartbtn.style.backgroundColor = "dodgerblue";
    cartbtn.innerText = "Add to cart";
    cartbtn.style.width = "100px";
    onAdd(product);
    setIsInCart(false);
  } else {
    console.log(cartbtn);
    cartbtn.innerText = "Remove from cart";
    cartbtn.style.backgroundColor = "red";
    cartbtn.style.width = "150px";
    onAdd(product);
    setIsInCart(true);
  }
};

const Product = ({ onAdd }) => {
  const {user}=useContext(AuthContext)
  let location = useLocation();
  const [product, setProduct] = useState(location.state.from);

  const [reviewData, setReviewData] = useState({
    user: user._id,
    comment: "",
    rating: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const commentInputRef = useRef();
  const ratingInputRef = useRef();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const productId = product._id;

      axios.post(`https://vendrebackend.vercel.app/server/products/search/${productId}/reviews`, reviewData)
      .then((response) => {
        const newReview = response.data;
        setProduct(newReview);
        setReviewData({  comment: "", rating: 0 });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred while submitting the review.");
        }
      });
  };


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0
        ? product.images.length - 1
        : currentImageIndex - 1
    );
  };

  function handleClick(e) {
    handleCartButtonClick(
      isInCart,
      e.currentTarget,
      setIsInCart,
      onAdd,
      product
    );
  }

  return (
    <div className="product-page">
      <div className="product-page__image-container">
        <div className="product-page__image-slider">
          <img
            className="product-page__image"
            src={product.images[currentImageIndex]}
            alt="Product"
            width={200}
            height={200}
          />
          <button
            className="product-page__image-slider-button product-page__image-slider-button--prev"
            onClick={handlePrevImage}
          >
            &lt;
          </button>
          <button
            className="product-page__image-slider-button product-page__image-slider-button--next"
            onClick={handleNextImage}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="product-page__details">
        <h1 className="product-page__title">{product.title}</h1>
        <p className="product-page__description">{product.description}</p>
        <div className="product-page__price-container">
          <span className="product-page__price">₹{product.price}</span>
          <span className="product-page__discount">
            {product.discountPercentage}% Off
          </span>
        </div>
        <div className="product-page__rating">
          <span className="product-page__rating-stars">⭐️⭐️⭐️⭐️⭐️</span>
          <span className="product-page__rating-count">
            ({product.reviews.length} Reviews)
          </span>
        </div>
        <div className="product-page__brand">
          <span className="product-page__brand-name">{product.brand}</span>
        </div>
        <div className="buybtn">
          <NavLink
            to={"/checkout"}
            state={{ cartItems: product, total: product.price }}
          >
            <button>Buy</button>
          </NavLink>
          <button onClick={(e) => handleClick(e)}>Add to cart</button>
        </div>
      </div>

      <div className="product-page__reviews">
        <h2 className="product-page__reviews-title">Reviews</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="reviewform" onSubmit={handleReviewSubmit}>

          <textarea
            ref={commentInputRef}
            placeholder="Write your review"
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            ref={ratingInputRef}
            placeholder="Rating (1-5)"
            value={reviewData.rating}
            onChange={(e) =>
              setReviewData({ ...reviewData, rating: parseInt(e.target.value) })
            }
            required
          />
          <button type="submit">Submit Review</button>
        </form>

        <ul className="product-page__reviews-list">
          {product.reviews.length > 0 ? (
            product.reviews.map((review,id) => (
              <li key={id} className="product-page__reviews-item">
                {console.log(review)}
                <div className="product-page__review-header">
                  <img
                    src={review.user.avatar}
                    alt={review.user.firstName}
                    className="product-page__review-profile"
                  />
                  <span className="product-page__review-username">
                    {review.user.firstName + " " + review.user.lastName}
                  </span>
                </div>
                <div className="product-page__review-content">
                  <span className="product-page__review-rating">
                    {Number.isInteger(review.rating) &&
                      review.rating > 0 &&
                      review.rating <= 5 &&
                      Array(review.rating)
                        .fill()
                        .map((_, index) => (
                          <span
                            key={index}
                            className="product-page__rating-stars"
                          >
                            ⭐️
                          </span>
                        ))}
                  </span>
                  <p>{review.comment}</p>
                </div>
                <hr />
              </li>
            ))
          ) : (
            <h1>No Reviews</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Product;
