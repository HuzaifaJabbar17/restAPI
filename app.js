require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const products_routes = require("./routes/product");

const connectDb = require("./db/connect");

app.use("/api/products", products_routes);

app.get("/", (req, res) => {
  console.log("Hello from the server");
  res.send("Hello Buddies");
});

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`listening to the port ${PORT} : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Server error`, error);
  }
};

start();
