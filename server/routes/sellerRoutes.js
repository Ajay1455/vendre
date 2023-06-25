const router = require("express").Router();
const Seller = require("../models/Seller");
const Product = require("../models/Product");

router.get("/", async(req, res) => {
  const all = await Seller.find({}).populate("user").populate("products");
  res.send(all);
});

// Create a new product for a specific seller
router.post("/:sellerId/products", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const {
      name,
      description,
      price,
      countInStock,
      imageUrl,
      images,
      reviews,
      brand,
      category,
      discountPercentage,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      countInStock,
      imageUrl,
      images,
      seller: req.params.sellerId,
      reviews,
      brand,
      category: category.toLowercase(),
      discountPercentage,
    });

    const createdProduct = await newProduct.save();

    seller.products.push(createdProduct._id);
    await seller.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products of a specific seller
router.get("/:sellerId/products", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.sellerId).populate(
      "products"
    );
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(seller.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id/follow", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    seller.followersCount += 1;
    await seller.save();
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:id/unfollow", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    seller.followersCount = Math.max(seller.followersCount - 1, 0);
    await seller.save();
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
