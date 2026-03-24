import 'dotenv/config';
import express from 'express';
import Razorpay from 'razorpay';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.js';
import ForgetPassword from './controller/fp.controller.js';
import ProductRouter from './routes/product.router.js';
import paymentRoutes from "./routes/payment.routes.js";
import evaluateRoutes from "./routes/evaluate.js";
import ChatRouter from './routes/chat.router.js';
import connectDB from "./config/db.js";
// import whatsappRoutes from "./routes/whatsapp.js";
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const app = express();



//to handle cross origin request
app.use(cors());

//configuration to fetch req body content : body parser middleware
//used to fetch req data from methods like : POST , PUT , PATCH , DELETE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuration to fetch file content : file upload middleware
app.use(fileUpload());

//route level middleware
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/chat", ChatRouter);
app.use("/user", UserRouter);
app.use("/category", CategoryRouter);
app.use("/subcategory", SubCategoryRouter);
//route for forgetpassword
app.post("/forgetpassword", ForgetPassword);
app.use("/api/payment", paymentRoutes);
app.use("/product", ProductRouter);
app.use("/api/evaluate", evaluateRoutes);
// app.use("/webhook", whatsappRoutes);
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config(); // ✅ FIX your error (you forgot import)

// // Connect DB
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.log("❌ Error:", err));

// // Test route
// app.get("/", (req, res) => {
//   res.send("API Running");
// });

// app.listen(process.env.PORT, () 
// });=> {
//   console.log(`Server running on port ${process.env.PORT}`);
// app.use("/api/ollamaChat", ollamaChat);
app.listen(3001);
connectDB();
console.log("Server invoked at link http://localhost:3001");


