const Joi = require("@hapi/joi");

//Register Validation.
const registerValidation = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    userType: Joi.number().required(),
    group: Joi.number().required(),
  });
  return schema.validate(body);
};

//Login Validation.
const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

//Service Request Validation

const serviceRequestValidation = (body) => {
  const schema = Joi.object({
    client_name: Joi.string().required(),
    client_id: Joi.string().required(),
    client_type: Joi.number().required(),
    //client_email: Joi.string().required(),
    //client_address: Joi.string().required(),
    //product_category: Joi.string().required(),
    sub_client_name: Joi.string().required(),
    sub_client_id: Joi.string().required(),
    service_status: Joi.number().required(),
    //docket_number: Joi.string().required(),
    comments: Joi.string().required(),
    correspondent_first_name: Joi.string().required(),
    correspondent_last_name: Joi.string().required(),
    correspondent_phone_number: Joi.string().required(),
    correspondent_email: Joi.string().required(),
    contact_point_id: Joi.string().required(),
    contact_point_first_name: Joi.string().required(),
    contact_point_last_name: Joi.string().required(),
    contact_point_phone_number: Joi.string().required(),
    contact_point_email: Joi.string().required(),
    product_for_service: Joi.string().required(),
  });

  return schema.validate(body);
};

const deleteUserValidation = (body) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(body);
};

const registerNewClient = (body) => {
  const schema = Joi.object({
    //client_id: Joi.string().required(),
    client_name: Joi.string().required(),
    sub_clients: Joi.object().required(),
  });
  return schema.validate(body);
};

const registerNewSubClient = (body) => {
  const schema = Joi.object({
    client_id: Joi.string().required(),
    //sub_client_id: Joi.string().required(),
    sub_client_name: Joi.string().required(),
    sub_client_address: Joi.string().required(),
    sub_client_correspondent_first_name: Joi.string().required(),
    sub_client_correspondent_last_name: Joi.string().required(),
    sub_client_correspondent_email: Joi.string().required(),
    sub_client_correspondent_phone: Joi.string().required(),
    products: Joi.array().required(),
    // service_history: Joi.string(),
    // payment_history: Joi.string(),
  });

  return schema.validate(body);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.serviceRequestValidation = serviceRequestValidation;
module.exports.deleteUserValidation = deleteUserValidation;
module.exports.registerNewClient = registerNewClient;
module.exports.registerNewSubClient = registerNewSubClient;
