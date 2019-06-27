const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const productbillSchema = new mongoose.Schema({
  product_id: { type: ObjectId },
  bill_id: { type: ObjectId },
  quantity: {
    type: Number,
    required: "Subtotal price can't be empty",
    default: 1
  }
});
productbillSchema.virtual("product", {
  ref: "Product", // The model to use
  localField: "product_id", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
productbillSchema.virtual("bill", {
  ref: "Bill", // The model to use
  localField: "bill_id", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
mongoose.model("Productbill", productbillSchema);
