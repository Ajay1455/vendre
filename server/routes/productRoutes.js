const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("seller")
      .populate("reviews.user");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all product reviews
router.get('/reviews', async (req, res) => {
  const products = await Product.find({}).populate('reviews.user');

  const uniqueReviews = [];
  const uniqueUsers = new Set();

  products.forEach((product) => {
    product.reviews.forEach((review) => {
      if (!uniqueUsers.has(review.user._id)) {
        uniqueReviews.push(review);
        uniqueUsers.add(review.user._id);
      }
    });
  });

  res.send(uniqueReviews);
});


// Get a specific product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.patch("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete("/find/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/search", async(req,res)=>{
//   const {q}=req.query;
//   Product.find({
//     $or:[{name : {$regex :`${q}`,$options:"i"}},
//     {category: {$regex :`${q}`,$options:"i"}}
//   ]}).then((data)=>{
//     console.log(data);
//     res.send(data);
//   }).catch((error)=>{
//     console.log(error);
//   })
// })

router.get("/search", async (req, res) => {
  console.log("first");
  const { q } = req.query;
  Product.find(
    {
      $or: [
        { name: { $regex: `${q}`, $options: "i" } },
        { category: { $regex: `${q}`, $options: "i" } },
      ],
    },
    { _id: 0 } // Exclude the _id field from the search results
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while searching for products." });
    });
});


router.post("/search/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;
    const { user, comment, rating } = req.body;
    console.log(req.body)
    const review = { user: user, comment, rating };

    const product = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: review } },
      { new: true }
    ).populate("reviews.user"); 

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add the review" });
  }
});


module.exports = router;
