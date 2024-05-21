const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  // console.log("products",req.query);
  const productData = await Product.find({});
  // finding based on company = apple using mongodb command
  // const productData = await Product.find({company : "apple"});
  // res.status(200).json({ msg: " I m getAllProducts " });
  res.status(200).json({ productData });
};
// we will get results based on company we serach in our url query
// http://127.0.0.1:3000/api/products/second?company=apple&featured=false
// http://127.0.0.1:3000/api/products/second?company=apple&name=iphone
// http://127.0.0.1:3000/api/products/second?company=apple&sort=-price
// http://127.0.0.1:3000/api/products/second?company=apple&sort=-price&select=name,company
const getAllProducts2 = async (req, res) => {
  // const { company } = req.query;
  const { company, name, featured, sort, select } = req.query;

  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // queryObject.name = name;
    // here i represents case insensitive I=i
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (featured) {
    queryObject.featured = featured;
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    // let sortfix = sort.replace(",", " ");
    let sortfix = sort.split(",").join(" ");
    // queryObject.sort = sortfix;
    apiData = apiData.sort(sortfix);
  }
  // in this if we try this its not working more than two field we want to select the its not working
  //http://127.0.0.1:3000/api/products/second?company=apple&sort=-price&select=name,company,price
  // if(select){
  //   let selectfix = select.replace(","," ");
  //   apiData = apiData.select(selectfix);
  // }
  // instead use this here it is working
  //http://127.0.0.1:3000/api/products/second?company=apple&sort=-price&select=name,company,price
  if (select) {
    let selectfix = select.split(",").join(" ");
    apiData = apiData.select(selectfix);
  }
  // reqq.query return the string thats we are convertung it
  let page = Number(req.query.page) || 1; //by default value is 1
  let limit = Number(req.query.limit) || 3; //by default value is 3
  // formula of skip  --------> skipping the document
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  // const productData = await Product.find(queryObject).sort(sort);
  const productData = await apiData;
  res.status(200).json({ productData });
};

const getAllProductsTesting = async (req, res) => {
  const productData = await Product.find(req.query);
  res.status(200).json({ productData });
  // http://127.0.0.1:3000/api/products/testing?company=mi
  // res.status(200).json({ msg: "Im getAllProductsTesting" });
};

// getting everything in ascending order in name wise
// sort("fieldName") ---> for ascending order
// sort("=fieldName")  ----> for descending order

const getAllProductsTesting2 = async (req, res) => {
  // sorting according to name A-Z
  // const productData = await Product.find(req.query).sort("name");
  // const productData = await Product.find(req.query).sort("-name");

  // ort according to the name in desc and price in asc
  // const productData = await Product.find(req.query).sort("-name price");
  // will show the name of every document
  // const productData = await Product.find(req.query).select("name");
  // will show every field except name in the document
  // const productData = await Product.find(req.query).select("-name");

  // want multiple fields to see
  const productData = await Product.find(req.query).select(
    "name price company"
  );

  res.status(200).json({ productData });
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
  getAllProducts2,
  getAllProductsTesting2,
};

// modelName.find({});

// if we want data related to company apple
// we can use req.query
// req.query is used to handle query wriiten in url
// req.query is written as key=value
// if there is more than one query they are seperated by & ampersand
// req.query is mostly used for searching,sorting,filtering,pagination
// learn three parts related to request object ---> req.query,req.body,req.params
// in our link or url we will write like this:
// http://localhost:3000/api/products/testing?company=apple
// after ? question mark in url is query



/*

.select()
.sort()
.skip()
.limit()


*/