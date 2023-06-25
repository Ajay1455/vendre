const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    cartProduct: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
)

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart