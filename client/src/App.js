import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BuySellBoxes from "./components/buysellbox/BuySellBoxes";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Product from "./components/product/Product";
import ProductLandPage from "./components/productHome/ProductLandPage";
import ShowCase from "./components/showProduct/ShowCase";
import Cart from "./components/cart/Cart";
import SellOnSitePage from "./components/sellerPage/SellOnSitePage";
import AboutUs from "./components/about/AboutUs";
import ReviewBox from "./components/reviewbox/ReviewBox";
import CheckoutPage from "./components/checkout/CheckoutPage";
import Confirmation from "./components/confirmation/Confirmation";
import SellerProfile from "./components/sellerPage/sellerProfile/SellerProfile";
import ContactForm from "./components/contactUs/ContactForm";
import ServicePage from "./components/service/ServicePage";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { AuthContext } from "./authContext/AuthContext";
import ProductContainer from "./components/productHome/productsContainer/ProductContainer";
import {
  addToCartAPI,
  getCartItemsAPI,
  removeFromCartAPI,
} from "./cartContext/CartApiCalls";
import { CartContext } from "./cartContext/CartContext";
import { updateCartItemQuantity } from "./cartContext/CartAction";
import axios from "axios";
import Profile from "./components/profile/Profile";

function App() {
  const { user } = useContext(AuthContext);

  // useLayoutEffect(()=>{
  //   getCartItemsAPI(user._id);
  // },[])

  const [cartItems, setCartItems] = useState([]);

  useLayoutEffect(() => {
    if (user) {
      fetch(`/users/${user._id}/cart`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCartItems(data);
        });
    }
  });

  // const {cartItems} = useContext(CartContext);
  // console.log(cartItems);

  const onAdd = async (product) => {
    // addToCartAPI(user._id, product);
    try {
      await axios.post(`/users/${user._id}/cart`, product);
      console.log("Added");
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (cart, quantity) => {
    // updateCartItemQuantity(user._id, product._id, quantity)
    try {
      await axios.patch(`/users/${user._id}/cart`, {
        quantity,
        cartId: cart._id,
      });
    } catch (error) {}
  };

  const onRemove = async (cartItemId) => {
    // removeFromCartAPI(user._id, productId);
    try {
      await axios.delete(`users/${user._id}/cart/${cartItemId}`);
    } catch (error) {}
  };

  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user !== null) {
      setIsLogin(true);
      setUserName(user.firstName);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar isLogin={isLogin} user={userName} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {isLogin ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Header />
                    <BuySellBoxes />
                    <ShowCase />
                    <ReviewBox />
                    <Footer />
                  </div>
                </>
              ) : (
                <Navigate to="/register" replace={true} />
              )}
            </>
          }
        />
        <Route path="/products" element={<ProductLandPage onAdd={onAdd} />} />
        <Route
          path="/product"
          element={
            <>
              <ProductContainer />
              <Product onAdd={onAdd} />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Cart
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            </>
          }
        />
        <Route
          path="/sell"
          element={
            <>
              <SellOnSitePage />
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>
              <AboutUs />
            </>
          }
        />
        <Route
          path="/service"
          element={
            <>
              <ServicePage />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <CheckoutPage />
            </>
          }
        />
        <Route
          path="/confirm"
          element={
            <>
              <Confirmation />
            </>
          }
        />
        <Route
          path="/sellerprofile"
          element={
            <>
              <SellerProfile />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {isLogin ? <Profile /> :<Navigate to="/" replace={true} /> }
            </>
          }
        />
        <Route
          path="/contactUs"
          element={
            <>
              <ContactForm />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>{!isLogin ? <Login /> : <Navigate to="/" replace={true} />}</>
          }
        />
        <Route
          path="/register"
          element={
            <>{!isLogin ? <Signup /> : <Navigate to="/" replace={true} />}</>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
