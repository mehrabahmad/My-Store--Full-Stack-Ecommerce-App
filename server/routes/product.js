// routes/product.js
import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.js';

const router = express.Router();

router.post('/', createProduct);           // Create product
router.get('/', getAllProducts);           // Get all products
router.get('/:id', getProductById);        // Get one product
router.put('/:id', updateProduct);         // Update product
router.delete('/:id', deleteProduct);      // Delete product

export default router;
