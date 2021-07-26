const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 250,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 250,
  },
  email: {
    type: String,
    required: true,
    max: 250,
  },
  password: {
    type: String,
    requiered: true,
    min: 8,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userType: {
    type: Number,
    required: true,
  },
  group: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
