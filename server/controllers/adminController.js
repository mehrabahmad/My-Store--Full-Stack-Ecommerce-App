// // controllers/adminController.js
import User from "../models/User.js";
// import Product from "../models/productModel.js";
import Product from "../models/Product.js";
// import Order from "../models/orderModel.js";
import Order from "../models/orderModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};
