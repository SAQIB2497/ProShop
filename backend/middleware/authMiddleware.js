import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHanlder from "../middleware/asyyncHandler.js";

//Protect Route
const protect = asyncHanlder(async (req, res, next) => {
  let token;

  //Read the jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const admin = asyncHanlder(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

export { protect, admin };
