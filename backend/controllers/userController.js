import asyncHandler from "../middleware/asyyncHandler.js";
import User from "../models/userModel.js";

// @desc    Auth User
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
});

// @desc    Logout User / clear cookie
// @route   POST /api/users
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout User");
});

// @desc    Get User profie
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get User Profile");
});

// @desc    Update User profie
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update User Profile");
});

// @desc    Get all Users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users");
});

// @desc    Get User By ID
// @route   GET /api/users  /:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User By ID");
});

// @desc    Delete User
// @route   Delete /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete USer");
});

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
