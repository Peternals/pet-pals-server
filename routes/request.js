const express = require("express");
const request = require("../controllers/requestController");
const verifyToken = require("../middleware/verifyToken");
const route = express.Router();

route.use("/", verifyToken);

route.get("/:status", request.getRequestsForPet);
route.patch("/:id", request.modifyRequest);

module.exports = route;
