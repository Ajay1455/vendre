import React from "react";
import { NavLink } from "react-router-dom";
import "./CartPage.css";

const Cart = ({ cartItems, onUpdate, onRemove }) => {

  const CartItem = ({ item }) => {
    const quantity = item.quantity || 1;

    const handleUpdate = (quantity) => {
      onUpdate(item, quantity);
    };

    const handleRemove = () => {
      console.log("inside handleRemove")
      onRemove(item._id);
    };

    return (
      <div className="CartItem" key={item.cartProduct._id}>
        <div className="item">
          <img
            src={item.cartProduct.imageUrl}
            height={80}
            alt={item.cartProduct.name}
          />
          <div>
            <h3>{item.cartProduct.name}</h3>
            <p>{item.cartProduct.description.slice(0,60)}...</p>
          </div>
          <div>
            <p>
              <button onClick={()=>handleUpdate(item.quantity+1)}>+</button> Quantity: {quantity}{" "}
              <button onClick={()=>handleUpdate(item.quantity-1)}>-</button>
            </p>
            <p>Price: ₹{item.cartProduct.price}</p>
          </div>
          <div className="btnContainer">
            <button onClick={handleRemove}>Remove from cart</button>
          </div>
        </div>
      </div>
    );
  };

  const itemsPrice = cartItems.reduce(
    (total, item) => total + item.cartProduct.price * item.quantity,
    0
  );
  const taxPrice = itemsPrice * 0.1; // Assuming tax is 10% of the total price
  const deliveryFee = 80; // Assuming a fixed delivery fee of $5
  const totalPrice = itemsPrice + taxPrice + deliveryFee;

  return (
    <div className="Cart">
      <div className="Cart-items">
        {cartItems.length === 0 && <div>Your cart is empty</div>}
        {cartItems.map((item) => (
          <CartItem item={item} key={item.cartProduct._id} />
        ))}
      </div>
      {cartItems.length !== 0 && (
        <div className="Cart-summary">
          <h2>Order Summary</h2>
          <div>
            <p>Item Price: ₹{itemsPrice}</p>
            <p>Tax: ₹{taxPrice.toFixed(2)}</p>
            <p>Delivery Fee: ₹{deliveryFee.toFixed(2)}</p>
            <hr />
            <p>Total: ₹{totalPrice}</p>
          </div>
          <NavLink to={"/checkout"} state={{ cartItems, total: totalPrice }}>
            <button>Place Order</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
