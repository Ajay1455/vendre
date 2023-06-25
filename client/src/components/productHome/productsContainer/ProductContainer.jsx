import React, { useContext, useState } from "react";
import "./ProductContainer.css";
import { NavLink } from "react-router-dom";
import Products from "./Products";
import { SearchContext } from "../../../product/SearchContext";

function ProductContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const { updateSearchResults } = useContext(SearchContext);

  const handleSearch = () => {
    const selectedCategory = document.getElementById("Categories").value;
    const query = searchQuery || selectedCategory;

    fetch(`/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        updateSearchResults(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSearchQuery(""); // Reset the search query
    handleSearch(selectedCategory); // Fetch search results based on the selected category
  };

  return (
    <div className="ProductContainer">
      <select name="Categories" onChange={handleCategoryChange} id="Categories">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="Home Appliances">Home Appliances</option>
        <option value="smartphones">Smartphones</option>
        <option value="eyeglasses">Eyeglasses</option>
        <option value="sunglasses">Sunglasses</option>

      </select>

      <div className="searchHandle">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img onClick={handleSearch} src="https://freeiconshop.com/wp-content/uploads/edd/search-outline-filled.png" alt="" />
      </div>

      <div className="cart">
        <NavLink to={"/cart"}>
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/cart-5590712-4652404.png"
            alt=""
          />
        </NavLink>
      </div>

    </div>
  );
}

export default ProductContainer;
