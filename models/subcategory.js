const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategory = mongoose.model(
  "SubCategory",
  new Schema({
    name: { type: String, required: true },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],
  })
);

module.exports = { SubCategory };
