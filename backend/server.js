import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoutes.js";

connectDB(); //COnnect to  MongoDB
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server Is Running on ${PORT}`);
});
