const express = require("express");
const Socket = require("socket.io");
const cors = require("cors");
const db = require("./db");

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.get("/test", (req, res) => {
	res.send("hello");
});
const server = app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

const io = Socket(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	require("./socket")(socket);
});
