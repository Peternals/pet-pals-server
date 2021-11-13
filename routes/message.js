const express = require("express");
const message = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");

const route = express.Router();
//get all users conversations
route.get("/conversations", verifyToken, message.getAllConversations);
//add conversation
route.post("/conversations", message.addConversation);

//get all messages in conversation
route.get("/:id", message.getAllMessages);
route.post("/", message.saveMessages);
module.exports = route;
