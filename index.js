const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authenticationRoute = require("./Auth/auth");
const router = require("./Auth/auth");
const initializationRoute = require("./Routes/init");
const serviceRoutes = require("./Routes/service_request_handler");
const clientManagementRoutes = require("./Routes/client_management_handler");
const productManagementRoutes = require("./Routes/product_management_handler");
const eventManagementRoutes = require("./Routes/event_management_routes");
const cors = require("cors");
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to DB!");
  }
);

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

//Router Middelwares.
app.use("/api/user", authenticationRoute);
app.use("/api/", initializationRoute);
app.use("/api/service/", serviceRoutes);
app.use("/api/clients/", clientManagementRoutes);
app.use("/api/products/", productManagementRoutes);
app.use("/api/events/", eventManagementRoutes);

app.get("/", (req, res) => {
  console.log("Working!");
  return res.status(200).send({ working: "ok" });
});

app.listen(9000, () => {
  console.log("Server up and running.");
});
