const { application } = require("express");
const express = require("express");

const route = express.Router();

route.post("/conversation");

module.exports = route;
