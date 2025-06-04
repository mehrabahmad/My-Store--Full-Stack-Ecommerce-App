import express from "express";
import protect from "../middleware/authMiddleware.js";
import Cart from "../models/cartModel.js";

const router = express.Router();

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    console.log("aa");
    console.log(req.user.id);
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "cartItems.product"
    );
    res.json(cart || { cartItems: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching cart" });
  }
});

router.put("/:cartItemId", protect, async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  const item = cart.cartItems.id(cartItemId);
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  item.quantity = quantity;
  await cart.save();

  res.status(200).json(cart);
});

// @desc    Add to cart
// @route   POST /api/cart
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { product, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, cartItems: [] });
    }

    const existingItem = cart.cartItems.find(
      (item) => item.product.toString() === product
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({ product, quantity });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user.id }).populate(
      "cartItems.product"
    );
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
router.delete("/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.product.toString() !== req.params.productId
      );

      await cart.save();
      res.json({ message: "Item removed" });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
});

export default router;
