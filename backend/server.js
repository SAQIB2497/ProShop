import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB(); //COnnect to  MongoDB
const PORT = process.env.PORT || 5000;

const app = express();

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Is Running on ${PORT}`);
});
