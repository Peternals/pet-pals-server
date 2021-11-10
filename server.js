const express = require("express");
const Socket = require("socket.io");

const app = express();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

const io = Socket(server);

io.socket.on("connection", (socket) => {
	console.log(socket.io);
});
