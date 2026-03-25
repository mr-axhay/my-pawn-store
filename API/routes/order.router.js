import express from "express";
import Order from "../models/order.js";
import ProductSchemaModel from "../models/product.model.js";

const router = express.Router();

// ✅ SAVE ORDER
router.post("/save", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    await ProductSchemaModel.findByIdAndUpdate(
      req.body.productId,
      { status: "sold out" }
    );

    res.json({ success: true, message: "Order saved" });
  } catch (err) {
    res.json({ success: false, message: "Error saving order" });
  }
});

// ✅ FETCH USER ORDERS
router.get("/fetch", async (req, res) => {
  const { userId } = req.query;

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  res.json({ info: orders });
});

router.get("/fetchOne", async (req, res) => {
  const order = await Order.findById(req.query.id);
  res.json({ info: order });
});

export default router;
