const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsTesting,
  getAllProducts2,
  getAllProductsTesting2,
} = require("../controllers/product");

router.route("/").get(getAllProducts);
router.route("/second").get(getAllProducts2);

router.route("/testing").get(getAllProductsTesting);
router.route("/testing-second").get(getAllProductsTesting2);

module.exports = router;
