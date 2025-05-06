import asyncHandler from "../middleware/asyyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch all products
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }

  res.status(404);
  throw new Error("Resource Not Found");
});

// @desc    Create a products
// @route   POST /api/products
// @access  Priavte/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createProduct = await product.save();
  res.status(201).js0n(createProduct );
});
