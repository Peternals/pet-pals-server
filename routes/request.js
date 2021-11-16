const express = require("express");
const request = require("../controllers/requestController");
const route = express.Router();

route.patch("/:id", request.modifyRequest);

module.exports = route;
