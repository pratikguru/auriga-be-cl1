const mongoose = require("mongoose");

const SubClientsSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
  },
  sub_client_id: {
    type: String,
    required: true,
  },
  sub_client_name: {
    type: String,
    required: true,
  },
  sub_client_address: {
    type: String,
    required: true,
  },
  sub_client_correspondent_first_name: {
    type: String,
    required: true,
  },
  sub_client_correspondent_last_name: {
    type: String,
    required: true,
  },
  sub_client_correspondent_email: {
    type: String,
    required: true,
  },
  sub_client_correspondent_phone: {
    type: String,
    required: true,
  },
  products: {
    type: Object,
    required: true,
    default: [{}],
  },
  service_history: {
    type: Object,
    default: {},
  },
  payment_history: {
    type: Array,
    default: {},
  },
  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("SubClients", SubClientsSchema);
