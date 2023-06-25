const cartReducer = (state, action) => {
    switch (action.type) {
      case "SET_CART_ITEMS":
        return {
          ...state,
          cartItems: action.payload,
        };
      case "ADD_TO_CART":
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.cartItemId !== action.payload
          ),
        };
      case "UPDATE_CART_ITEM_QUANTITY":
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.cartItemId === action.payload.cartItemId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  