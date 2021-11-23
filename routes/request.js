const express = require("express");
const request = require("../controllers/requestController");
const verifyToken = require("../middleware/verifyToken");
const route = express.Router();

route.use("/", verifyToken);

route.get("/owner/:status", request.getRequestsForPetOwner);
route.patch("/carer", request.seenAllRequest);
route.get("/upcoming", request.getUpcomingRequest);
route.get("/pending", request.getCarerPendingRequest);
route.post("/", request.addRequest);
route.get("/:status/:id", request.getRequestsByStatusAndPetId);
route.patch("/:id", request.modifyRequest);

module.exports = route;
