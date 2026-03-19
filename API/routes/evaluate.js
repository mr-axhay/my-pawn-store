import express from "express";
import Evaluation from "../models/Evaluation.js";

const router = express.Router();

// GET all requests
router.get("/", async (req, res) => {
  const requests = await Evaluation.find().sort({ createdAt: -1 });
  res.json(requests);
});

// POST request (already done)
router.post("/", async (req, res) => {
  const { productId } = req.body;
  const newRequest = new Evaluation({ productId });
  await newRequest.save();
  res.json({ message: "Request sent" });
});

// APPROVE
router.put("/:id/approve", async (req, res) => {
  await Evaluation.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });
  res.json({ message: "Approved" });
});

// REJECT
router.put("/:id/reject", async (req, res) => {
  await Evaluation.findByIdAndUpdate(req.params.id, {
    status: "rejected"
  });
  res.json({ message: "Rejected" });
});

export default router;