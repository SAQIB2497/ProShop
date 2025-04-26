import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyyncHandler.js";
import Product from "../models/productModel.js";
// import products from "../data/product.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    // const product = products.find((p) => p._id === req.params.id);

    if (product) {
      return res.json(product);
    }

    res.status(404);
    throw new Error("Resource Not Found");
  })
);

export default router;
