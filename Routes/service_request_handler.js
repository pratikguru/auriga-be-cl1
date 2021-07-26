const router = require("express").Router();
const authVerify = require("../Auth/verifyToken");
const User = require("../Models/user");
const ServiceRequest = require("../Models/service_request");
const { serviceRequestValidation } = require("../Validations/validation");

const uniqueId = require("uniqid");
const { request } = require("express");
const { update } = require("../Models/user");

router.delete("/delete_service_request", authVerify, async (req, res) => {
  const userInformation = await User.findOne({
    _id: req.user._id,
  });

  if (userInformation["userType"] === 1) {
    res.status(200).send({
      message: "OK! Authorized service request deletion success.",
    });
  } else {
    res.status(401).send({
      message: "Error! UN-Authorised service request not allowed.",
    });
  }
});

router.post("/get_specific_service_request", authVerify, async (req, res) => {
  const userInformation = await User.findOne({
    _id: req.user._id,
  });
  const { password, ...filteredUserInformation } = userInformation["_doc"];

  if (filteredUserInformation["userType"] === 1) {
    const serviceInformation = await ServiceRequest.find({
      sub_client_id: req.body.sub_client_id,
    });
    return res.status(200).send({
      message: "Returning Service List for User.",
      content: serviceInformation,
    });
  } else {
    const userInformation = await User.findOne({
      _id: req.user._id,
    });
    const serviceInformation = await ServiceRequest.find({
      //contact_point_id: userInformation["_doc"]["_id"],
      sub_client_id: req.body.sub_client_id,
    }).sort({ time_of_request: -1 });

    console.log(serviceInformation);
    return res.status(200).send({
      message: "Returning Service List for Admin.",
      content: serviceInformation,
    });
  }
});

router.get("/get_service_request", authVerify, async (req, res) => {
  /*
    Fetch service request has to be based on a few parameters. 
    1. Fetch by contact point ID.
    2. Fetch based on permissions. 
  */

  const userInformation = await User.findOne({
    _id: req.user._id,
  });
  const { password, ...filteredUserInformation } = userInformation["_doc"];

  if (filteredUserInformation["userType"] === 1) {
    const serviceInformation = await ServiceRequest.find();
    return res.status(200).send({
      message: "Returning Service List for User.",
      content: serviceInformation,
    });
  } else {
    const userInformation = await User.findOne({
      _id: req.user._id,
    });
    const serviceInformation = await ServiceRequest.find({
      contact_point_id: userInformation["_doc"]["_id"],
    }).sort({ time_of_request: -1 });

    return res.status(200).send({
      message: "Returning Service List for Admin.",
      content: serviceInformation,
    });
  }
});

router.post("/update_service_request", authVerify, async (req, res) => {
  const userInformation = await User.findOne({
    _id: req.user._id,
  });

  const { docket_number, _id, change_key, body } = req.body;
  const { error } = serviceRequestValidation(body);
  if (error) {
    return res.status(400).send(error.details);
  } else {
    try {
      if (change_key === "service_status") {
        const updatedServiceInformation = await ServiceRequest.updateOne(
          { _id: _id },
          req.body
        );

        if (updatedServiceInformation["n"]) {
          return res.status(200).send({ message: "OK", content: req.body });
        } else {
          return res.status(400).send({
            message: "Update Failure!",
            content: updatedServiceInformation,
          });
        }
      } else {
        if (userInformation["userType"] === 1) {
          const updatedServiceInformation = await ServiceRequest.updateOne(
            { _id: _id },
            req.body
          );

          if (updatedServiceInformation["n"]) {
            return res.status(200).send({ message: "OK", content: req.body });
          } else {
            return res.status(400).send({
              message: "Update Failure!",
              content: updatedServiceInformation,
            });
          }
        } else {
          return res.status(400).send({
            message: "UnAuthorized edits aren't allowed, please contact admin!",
          });
        }
      }
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  }
});

router.post("/add_service_request", authVerify, async (req, res) => {
  console.log("service", req.body);
  const { error } = serviceRequestValidation(req.body);
  if (error) {
    return res.status(400).send(error);
  } else {
    let request = req.body;
    const service_request = new ServiceRequest({
      client_name: request.client_name,
      client_id: request.client_id,
      client_type: request.client_type,
      sub_client_name: request.sub_client_name,
      sub_client_id: request.sub_client_id,
      docket_number: uniqueId(),
      service_status: request.service_status,
      comments: request.comments,
      correspondent_first_name: request.correspondent_first_name,
      correspondent_last_name: request.correspondent_last_name,
      correspondent_phone_number: request.correspondent_phone_number,
      correspondent_email: request.correspondent_email,
      contact_point_id: request.contact_point_id,
      contact_point_first_name: request.contact_point_first_name,
      contact_point_last_name: request.contact_point_last_name,
      contact_point_phone_number: request.contact_point_phone_number,
      contact_point_email: request.contact_point_email,
      product_for_service: request.product_for_service,
      time_of_request: new Date(),
    });
    try {
      const saved_service_request = await service_request.save();
      console.log(saved_service_request);
      res.send({ id: saved_service_request, message: "OK" });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = router;
