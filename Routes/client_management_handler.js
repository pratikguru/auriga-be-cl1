const router = require("express").Router();
const authVerify = require("../Auth/verifyToken");
const User = require("../Models/user");
const Client = require("../Models/clients");
const SubClients = require("../Models/sub_clients");
const Products = require("../Models/products");

const {
  registerNewClient,
  registerNewSubClient,
} = require("../Validations/validation");
const uniqueId = require("uniqid");
const { request } = require("express");

router.post("/get_sub_clients", authVerify, async (req, res) => {
  try {
    const sub_clients = await SubClients.find({
      client_id: req.body.client_id,
    }).sort({ created_at: -1 });
    res.status(200).send({ message: sub_clients });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/add_sub_client", authVerify, async (req, res) => {
  const { error } = registerNewSubClient(req.body);
  if (error) {
    res.status(400).send({ message: error });
  } else {
    let parentClient = await Client.findOne({
      client_id: req.body.client_id,
    });
    const savedSubClient = new SubClients({
      client_id: parentClient["client_id"],
      sub_client_id: uniqueId(),
      sub_client_name: req.body.sub_client_name,
      sub_client_address: req.body.sub_client_address,
      sub_client_correspondent_first_name:
        req.body.sub_client_correspondent_first_name,
      sub_client_correspondent_last_name:
        req.body.sub_client_correspondent_last_name,
      sub_client_correspondent_email: req.body.sub_client_correspondent_email,
      sub_client_correspondent_phone: req.body.sub_client_correspondent_phone,
      service_history: {
        init: Date(),
      },
      payment_history: {
        init: Date(),
      },
      products: req.body.products,
      created_at: new Date(),
    });

    try {
      const savedClientResponse = await savedSubClient.save();

      if (parentClient["sub_clients"]) {
        parentClient["sub_clients"][
          savedSubClient["sub_client_id"]
        ] = savedSubClient;
      } else {
        parentClient["sub_clients"] = {};
        parentClient["sub_clients"][
          savedSubClient["sub_client_id"]
        ] = savedSubClient;
      }

      const updatedParentClient = await Client.updateOne(
        {
          _id: parentClient["_id"],
        },
        parentClient
      );

      res.status(200).send({
        message: "OK",
        result: parentClient,
      });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
});

router.post("/add_client", authVerify, async (req, res) => {
  const { error } = registerNewClient(req.body);
  if (error) {
    res.status(400).send({ message: error });
  } else {
    const newClient = new Client({
      client_id: uniqueId(),
      client_name: req.body.client_name,
      sub_clients: {},
      time: new Date(),
    });

    try {
      const savedClient = await newClient.save();
      res.status(200).send({ id: savedClient, message: "OK" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  }
});

router.get("/get_clients", authVerify, async (req, res) => {
  try {
    const clients = await Client.find().sort({ time: -1 });
    res.status(200).send({ message: clients });
  } catch (error) {
    res.status(400).send({ message: clients });
  }
});

module.exports = router;
