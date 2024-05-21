const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/restapi";

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
};

module.exports = connectDb;
