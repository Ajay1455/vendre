const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phoneNumber: { type: String },
    avatar: {
      type: String,
    },
    brand: { type: String, default: null },
    isSeller: { type: Boolean },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    address: { type: String },
    updated: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // something happen with timestamps
);

module.exports = mongoose.model("User", UserSchema);
