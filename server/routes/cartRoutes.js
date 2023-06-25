const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");

// Get the cart items for a specific user
router.get("/users/:userId/cart", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "cartItems",
      populate: {
        path: "cartProduct",
        model: "Product", // Make sure this matches the model name for the Product
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Add a product to the cart
router.post("/users/:userId/cart", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(req.body._id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = await Cart.findOne({
      user: user._id,
      cartProduct: product._id,
    });

    if (cartItem) {
      // cartItem.quantity += req.body.quantity || 1;
      // await cartItem.save();
      await Cart.findByIdAndDelete(cartItem._id);
      res.status(200);
    } else {
      const newCartItem = new Cart({
        user: user._id,
        cartProduct: product._id,
        quantity: req.body.quantity || 1,
      });

      await newCartItem.save();
      user.cartItems.push(newCartItem._id);
      await user.save();
    }

    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a product from the cart
router.delete("/users/:userId/cart/:cartItemId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = await Cart.findById(req.params.cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await Cart.findByIdAndDelete(req.params.cartItemId);

    user.cart.pull(req.params.cartItemId);
    await user.save();
    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the quantity of a product in the cart
router.patch("/users/:userId/cart/", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItem = await Cart.findById(req.body.cartId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = req.body.quantity || cartItem.quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
