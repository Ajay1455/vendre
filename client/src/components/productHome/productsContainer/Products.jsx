import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Products.css";
import { handleCartButtonClick } from "../../product/Product";
import { SearchContext } from "../../../product/SearchContext";

function Products({ onAdd }) {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const { searchResults } = useContext(SearchContext);

  useEffect(() => {
    if (searchResults.length > 0) {
      setProductData(searchResults);
      setLoading(false);
    } else {
      fetch("https://vendrebackend.vercel.app/server/products")
        .then((res) => res.json())
        .then((data) => {
          setProductData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error:", error);
          setLoading(false);
        });
    }
  }, [searchResults]);

  if (loading) {
    return <div>Loading...</div>;
  }

  let categories = [];

  if (productData.length > 0) {
    categories = [...new Set(productData.map((product) => product.category))];
  }

  function handleClick(product, e) {
    handleCartButtonClick(
      isInCart,
      e.currentTarget,
      setIsInCart,
      onAdd,
      product
    );
  }

  return (
    <div className="product-grid">
      {productData.length > 0 ? (
        <>
          {categories.map((category) => (
            <div key={category} className="product-grid__section">
              <h2>{category.toUpperCase()}</h2>
              <div className="product-grid__items">
                {productData
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <div key={product.name} className="product-grid__item">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={"300"}
                        height={"300"}
                      />
                      <h3>{product.name}</h3>
                      <p className="product-grid__item__price">
                        ₹{product.price}
                      </p>
                      <div className="buyProduct">
                        <NavLink to="/product" state={{ from: product }}>
                          <button>Buy</button>
                        </NavLink>
                        <button onClick={(e) => handleClick(product, e)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>No products available at this time.</div>
      )}
    </div>
  );
}

export default Products;
