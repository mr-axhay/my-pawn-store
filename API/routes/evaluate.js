import express from "express";
import Evaluation from "../models/Evaluation.js";
import ProductSchemaModel from "../models/product.model.js";
import sendWhatsAppMessage from "../utils/twilio.js";

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
  const record = await Evaluation.findByIdAndUpdate(req.params.id, {
    status: "approved",
  });
  const pList = await ProductSchemaModel.findOne({ _id: record.productId });
  //  Send WhatsApp alert- commented as it will reduce the balance but it works!
  // await sendWhatsAppMessage(
  //   "+917746830045", // user/admin number
  //   `Great news! Your product addition request has been successfully approved by the admin. Your product is now ready to be listed and made available to customers.\n\nName: ${pList.catnm}`,
  // );

  res.json({ message: "Approved" });
});

// REJECT
router.put("/:id/reject", async (req, res) => {
  await Evaluation.findByIdAndUpdate(req.params.id, {
    status: "rejected",
  });
  res.json({ message: "Rejected" });
});

export default router;
