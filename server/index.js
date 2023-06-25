const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoutes= require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
const cartRoutes =require('./routes/cartRoutes');
const sellerRoutes =require('./routes/sellerRoutes')
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://vendre-rose.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const port = process.env.PORT || 2000;
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

// Test route
app.get('/',(req,res)=>{
  res.send("<h1>This is Vendre backend.</h1>")
})

app.use("/server/auth", authRoute);
app.use("/server/users", userRoutes);
app.use("/server/products", productRoutes);
app.use("/server/", cartRoutes);
app.use("/server/sellers", sellerRoutes )

app.post("/server/contact", async (req, res) => {
  const { message, email, name } = req.body;
  
  try {
    const contactEmail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Password,
      },
    });

    const mail = {
      from: email,
      to: process.env.Email,
      subject: "Vendre Contact Form Submission",
      html: `<h4>Name: ${name}</h4>
               <p>Email: ${email}</p>
               <p>Message: ${message}</p>
               <p style="color:grey">Website Vendre ❤️</p>`
    };

    contactEmail
      .sendMail(mail)
      .then((data) => {
        console.log("Email sent " + data.response);
        return res.status(201).json({ msg: "Email Sent!" });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});

if(port){
  app.listen(port,() => {
    console.log(`Listening to port ....${port}`);
  });
}

module.exports=app;
