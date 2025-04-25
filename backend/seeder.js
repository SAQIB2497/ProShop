import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/product.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

connectDB();

//Destroy Data
const importData = async () => {
  try {
    //Deleting everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //Creating a User
    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    //Insert Products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //Insert Many in sample product
    await Product.insertMany(sampleProducts);

    console.log("Data Imported:".green.inverse);
    process.exit();
  } catch (error) {
    console.log("Error:".red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //Deleting everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed:".green.inverse);
    process.exit();
  } catch (error) {
    console.log("Error:".red.inverse);
    process.exit(1);
  }
};

//Condition to use import and destroy data

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
