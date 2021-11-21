const express = require("express");
const message = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");

const route = express.Router();
route.use("/", verifyToken);
route.post("/", message.saveMessages);
//get all users conversations
route.get("/conversations", message.getAllConversations);
//add conversation
route.post("/conversations", message.addConversation);

//get all messages in conversation
route.get("/last/:id", message.getLastMessage);
route.post("/seen/:id", message.seenConversation);
route.get("/:id", message.getAllMessages);
module.exports = route;
