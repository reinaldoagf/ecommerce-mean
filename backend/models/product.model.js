const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const productSchema = new mongoose.Schema({
  vendor_id: {
    type: ObjectId,
    ref: "User"
  },
  model: {
    type: String,
    required: "Model can't be empty"
  },
  brand: {
    type: String,
    required: "Brand can't be empty"
  },
  price: {
    type: Number,
    required: "Price can't be empty"
  },
  stock: {
    type: Number,
    required: "Stock can't be empty",
    default: 1
  }
});
productSchema.virtual("vendor", {
  ref: "User", // The model to use
  localField: "vendor_id", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
mongoose.model("Product", productSchema);
