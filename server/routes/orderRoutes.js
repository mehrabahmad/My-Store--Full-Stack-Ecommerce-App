import express from "express";
import Order from "../models/orderModel.js";
import protect from "../middleware/authMiddleware.js";
import Cart from "../models/cartModel.js";

const router = express.Router();

// POST /api/orders - Place order
router.post("/", protect, async (req, res) => {
  const { orderItems, totalPrice, address } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user.id,
    orderItems,
    totalPrice,
    address,
  });

  await order.save();
  await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $set: { cartItems: [] } }
  );

  res.status(201).json(order);
});

// GET /api/orders/myorders - Get user's orders
router.get("/myorders", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
  res.json(orders);
});

export default router;
