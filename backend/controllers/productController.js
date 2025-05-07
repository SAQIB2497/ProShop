import asyncHandler from "../middleware/asyyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products with pagination
// @route   GET /api/products?pageNumber=1
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const pageSize = 2; // You can change this to any number
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments();
  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
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
  res.status(201).js0n(createProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a new Review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createdProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({ message: "Review added" });
});

