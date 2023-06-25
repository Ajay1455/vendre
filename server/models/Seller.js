const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  followersCount: { type: Number, default: 0 } ,
  successStory:{type:String, default:""},
  brand:{type:String, default:""}
});

module.exports = mongoose.model('Seller', sellerSchema);
