const mongoose = require("mongoose");
const _ = require("lodash");

const Bill = mongoose.model("Bill");
const Product = mongoose.model("Product");
const ProductBill = mongoose.model("Productbill");

module.exports.checkin = async (req, res) => {
  try {
    let total_price = 0;
    let bill = new Bill();
    bill.buyer_id = req.body.buyer_id;
    req.body.products.forEach(async element => {
      const product = await Product.findOne({ _id: element.product_id });
      total_price = total_price + product.price * element.quantity;
      let productBill = new ProductBill();
      productBill.product_id = product._id;
      productBill.bill_id = bill._id;
      productBill.quantity = element.quantity;
      await productBill.save();
      bill.total_price = total_price;
      const e = await bill.save();
      res.status(200).json({ e });
    });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    await ProductBill.remove({});
    await Bill.remove({});
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};
