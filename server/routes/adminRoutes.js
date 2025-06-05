// routes/adminRoutes.js
import express from "express";
import {
  getAllUsers,
  getAllProducts,
  getAllOrders,
  deleteUser,
  deleteProduct,
  updateOrderStatus,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.use(protect, isAdmin);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/products", getAllProducts);
router.delete("/products/:id", deleteProduct);

router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

export default router;
