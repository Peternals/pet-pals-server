const express = require("express");
const route = express.Router();
const auth = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
require("dotenv").config();

route.get("/", verifyToken, auth.verifyAndGetUser);
route.post("/validation", auth.validation);
route.post("/sign-up", auth.signUp);
route.post("/sign-in", auth.signIn);
route.post("/welcome", verifyToken, auth.verify);

module.exports = route;
