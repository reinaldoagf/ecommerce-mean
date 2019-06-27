const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const billSchema = new mongoose.Schema({
  buyer_id: { type: ObjectId },
  total_price: {
    type: Number,
    required: "Total price can't be empty",
    default:0
  }
});
billSchema.virtual("buyer", {
  ref: "User", // The model to use
  localField: "buyer_id", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});
mongoose.model("Bill", billSchema);
