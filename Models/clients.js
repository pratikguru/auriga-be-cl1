const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
  },
  client_name: {
    type: String,
    required: true,
  },
  sub_clients: {
    type: Object,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Clients", ClientSchema);
