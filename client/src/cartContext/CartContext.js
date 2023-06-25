import React, { createContext, useReducer } from "react";
import cartReducer from "./CartReducer";

const initialState = {
  cartItems: [],
};

export const CartContext = createContext(initialState);

const CartContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const setCartItems = (cartItems) => {
    dispatch({ type: "SET_CART_ITEMS", payload: cartItems });
  };

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (cartItemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: cartItemId });
  };

  const updateCartItemQuantity = (cartItemId, quantity) => {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { cartItemId, quantity },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
