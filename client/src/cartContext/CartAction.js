export const setCartItems = (cartItems) => ({
    type: "SET_CART_ITEMS",
    payload: cartItems,
  });
  
  export const addToCart = (item) => ({
    type: "ADD_TO_CART",
    payload: item,
  });
  
  export const removeFromCart = (cartItemId) => ({
    type: "REMOVE_FROM_CART",
    payload: cartItemId,
  });
  
  export const updateCartItemQuantity = (cartItemId, quantity) => ({
    type: "UPDATE_CART_ITEM_QUANTITY",
    payload: {
      cartItemId,
      quantity,
    },
  });
  