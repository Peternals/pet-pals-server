const express = require("express");
const route = express.Router();
const auth = require("../controllers/authController");
require("dotenv").config();

route.post("/sign-in", auth.signIn);

module.exports = route;
