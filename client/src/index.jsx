import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import CartContextProvider from "./cartContext/CartContext";
import { SearchProvider } from "./product/SearchContext";

ReactDOM.render(
  <SearchProvider>
    <CartContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CartContextProvider>
  </SearchProvider>,
  document.getElementById("root")
);
