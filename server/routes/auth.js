const router = require("express").Router();
const User = require("../models/User");
const Seller = require('../models/Seller')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// 1. Registrations
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      isSeller: req.body.isSeller,
      address:"",
      avatar:"https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM=",
      phoneNumber:null
    });

    if (req.body.isSeller) {
      const newSeller = new Seller({
        user: newUser._id,
        products: [],
        brand:"",
        successStory:"",
        followersCount:0
      });
      await newSeller.save();
      newUser.seller = newSeller._id;
    }

    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});


// Login work
router.post("/login", async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    !user && res.status(401).json("Wrong passsword or username");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalpassword = bytes.toString(CryptoJS.enc.Utf8);

    originalpassword !== req.body.password &&
      res.status(401).json("Wrong passsword or username");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;





