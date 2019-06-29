const mongoose = require("mongoose");
const _ = require("lodash");

const Product = mongoose.model("Product");

module.exports.register = async (req, res, next) => {
  let product = new Product();
  product.vendor_id = req._id;
  product.price = req.body.price;
  product.brand = req.body.brand;
  product.model = req.body.model;
  try {
    const doc = await product.save();
    res.status(200).send(doc);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};
module.exports.details = async (req, res, next) => {
  try {
    const doc = await Product.findOne({ _id: req.params.id }).populate(
      "user"
    );
    if (!doc)
      return res
        .status(404)
        .json({ status: false, message: "Product record not found." });
    res
      .status(200)
      .send({
        product: doc,
        vendor: _.pick(doc.vendor, ["fullName", "email"])
      });
  } catch (err) {
    if (err.code == 11000) res.status(404).send([err]);
    else return next(err);
  }
};
module.exports.all = async (req, res, next) => {
  try {
    const doc = await Product.find({}, { brand: 1, model: 1, price: 1, stock: 1 }).populate("user");
    if (!doc)
      return res
        .status(404)
        .json({ status: false, message: "Product record not found." });
    res
      .status(200)
      .json({ products: doc });
  } catch (err) {
    if (err.code == 11000) res.status(404).send([err]);
    else return next(err);
  }
};

module.exports.myProducts = async (req, res, next) => {
  try {
    const doc = await Product.find({ vendor_id: req._id }, { brand: 1, model: 1, price: 1, stock: 1 });
    if (!doc)
      return res
        .status(404)
        .json({ status: false, message: "Products not founds." });
    res.status(200).send( doc );
  } catch (err) {
    if (err.code == 11000) res.status(404).send([err]);
    else return next(err);
  }
};