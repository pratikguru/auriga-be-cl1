const router = require("express").Router();
const authVerify = require("../Auth/verifyToken");
const User = require("../Models/user");
const Product = require("../Models/products");
const uniqueId = require("uniqid");

router.post("/add_product", authVerify, async (req, res) => {
  try {
    const newProduct = new Product({
      product_name: req.body.product_name,
      product_id: uniqueId(),
    });
    const newProducrSavedResposne = await newProduct.save();
    res.status(200).send({ message: newProducrSavedResposne });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/get_products", authVerify, async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).send({ message: "OK", content: productList });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
