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

// Format sell_by_date to display only day, month, and year
FoodSchema.virtual("formatted_sell_by_date").get(function () {
  return this.sell_by_date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

// Export model
module.exports = mongoose.model("Food", FoodSchema);