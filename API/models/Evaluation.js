import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
  productId: String,
  status: {
    type: String,
    default: "pending" // pending, approved, rejected
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Evaluation", evaluationSchema);