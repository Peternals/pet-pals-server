const express = require("express");
const Socket = require("socket.io");

const app = express();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

const io = Socket(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
	require("./socket")(socket);
});
