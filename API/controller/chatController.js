import Product from "../models/product.model.js";
import Order from "../models/order.js";

export const handleChat = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;
  const msg = message.toLowerCase();

  try {
    let reply = "";

    if (msg.includes("products")) {
      const products = await Product.find({ userId });

      reply = products.length
        ? "📦 Your Products:\n" + products.map((p) => `• ${p.catnm}`).join("\n")
        : "No products found.";
    } else if (msg.includes("order")) {
      const orders = await Order.find({ userId });
      console.log(orders);
      reply = orders.length
        ? "🧾 Your Orders:\n" +
          orders.map((o) => `•  ${p.catnm}: ${p.price} ${o.status}`).join("\n")
        : "No orders found.";
    } else if (msg.includes("evaluation")) {
      const products = await Product.find({ userId });
      const evaluations = await Evaluation.find({ userId });

      reply =
        "📊 Evaluation:\n" +
        products
          .map((p) => `• ${p.catnm}: ${p.status || "Pending"}`)
          .join("\n");
    } else if (msg.includes("price")) {
      const products = await Product.find({ userId });

      reply =
        "💰 Prices:\n" +
        products.map((p) => `• ${p.catnm}: ₹${p.price}`).join("\n");
    } else {
      reply = "Try asking about products, orders, evaluation or price.";
    }

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
};
