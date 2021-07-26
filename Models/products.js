const mongoose = require("mongoose");

const ProductScheme = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductScheme);
