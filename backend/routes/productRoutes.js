import express from "express";
const router = express.Router();
import {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createdProductReviews,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProduct).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createdProductReviews);

export default router;
