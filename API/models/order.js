import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  mobile: String,

  productId: String,
  productName: String,
  price: Number,
  image: String,

  paymentId: String,
  orderId: String,

  status: {
    type: String,
    default: "SUCCESS",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", OrderSchema);