import express from "express";
const router = express.Router();
import {
  getProduct,
  getProductById,
  createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProduct).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router;
