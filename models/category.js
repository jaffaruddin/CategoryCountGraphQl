const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = mongoose.model(
  "Category",
  new Schema({
    name: { type: String, required: true },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],
  })
);

module.exports = Category;
