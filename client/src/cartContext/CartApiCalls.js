import axios from "axios";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export const getCartItemsAPI = async (userId) => {
  console.log(userId);
  try {
    const res = await axios.get(`/users/${userId}/cart`);
    // Assuming the response contains the cart items
    const cartItems  = res.data;
    // Update the cart state using the cart context function
    const { setCartItems } = useContext(CartContext);
    setCartItems(cartItems);
  } catch (error) {
    // Handle error
  }
};

export const addToCartAPI = async (userId, item) => {
  console.log("In addtocart api "+userId+" and "+item);
  try {
    await axios.post(`/users/${userId}/cart`, item);
    // Update the cart state using the cart context function
    const { addToCart } = useContext(CartContext);
    addToCart(item);
  } catch (error) {
    // Handle error
  }
};

export const removeFromCartAPI = async (userId, cartItemId) => {
  try {
    await axios.delete(`users/${userId}/cart/${cartItemId}`);
    // Update the cart state using the cart context function
    const { removeFromCart } = useContext(CartContext);
    removeFromCart(cartItemId);
  } catch (error) {
    // Handle error
  }
};

export const updateQuantityAPI = async (userId, cartItemId, quantity) => {
  try {
    await axios.patch(`users/${userId}/cart/${cartItemId}`, { quantity });
    // Update the cart state using the cart context function
    const { updateCartItemQuantity } = useContext(CartContext);
    updateCartItemQuantity(cartItemId, quantity);
  } catch (error) {
    // Handle error
  }
};
