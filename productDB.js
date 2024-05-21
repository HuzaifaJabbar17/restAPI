require("dotenv").config();

const connectDb = require("./db/connect");
const Product = require("./models/product");

// importing json file

const productJson = require("./products.json");

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    // first delete all the data inside it
    await Product.deleteMany();

    // inserting data inside our database
    await Product.create(productJson);
    console.log("Successfully inserted our data in database");
  } catch (error) {
    console.log(error);
  }
};

start();
// to send the data in our database use this method   ----->  modelname.create()
// to insert the data we have to run  ---> node productDB.js
