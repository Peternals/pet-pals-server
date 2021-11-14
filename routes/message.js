const express = require("express");
const message = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");

const route = express.Router();
route.use("/", verifyToken);
//get all users conversations
route.get("/conversations", message.getAllConversations);
//add conversation
route.post("/conversations", message.addConversation);

//get all messages in conversation
route.get("/:id", message.getAllMessages);
route.post("/", message.saveMessages);
module.exports = route;
