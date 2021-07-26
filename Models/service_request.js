const Mongoose = require("mongoose");
const { any, string } = require("@hapi/joi");

const ServiceRequestSchema = new Mongoose.Schema({
  client_name: {
    type: String,
    required: true,
    min: 3,
    max: 250,
  },
  service_status: {
    type: Number,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  client_type: {
    type: Number,
    required: true,
  },
  sub_client_name: {
    type: String,
    required: true,
  },
  sub_client_id: {
    type: String,
    required: true,
  },
  docket_number: {
    type: String,
    required: true,
  },
  time_of_request: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: String,
    required: true,
    min: 10,
    max: 250,
  },

  contact_point_id: {
    type: String,
    required: true,
    min: 10,
    max: 250,
  },
  correspondent_first_name: {
    type: String,
    required: true,
    min: 10,
    max: 250,
  },
  correspondent_last_name: {
    type: String,
    required: true,
    min: 10,
    max: 250,
  },
  correspondent_phone_number: {
    type: String,
    required: true,
  },
  correspondent_email: {
    type: String,
    required: true,
  },
  contact_point_first_name: {
    type: String,
    required: true,
  },
  contact_point_last_name: {
    type: String,
    required: true,
  },
  contact_point_phone_number: {
    type: String,
    required: true,
  },
  contact_point_email: {
    type: String,
    required: true,
  },
  product_for_service: {
    type: Object,
    required: true,
  },
});

module.exports = Mongoose.model("ServiceRequest", ServiceRequestSchema);
