const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  items_left: { type: Number, required: true },
  sell_by_date: { type: Date },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

// Virtual for author's URL
FoodSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/store/food/${this._id}`;
});

// Export model
module.exports = mongoose.model("Food", FoodSchema);