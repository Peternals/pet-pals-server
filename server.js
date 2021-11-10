const express = require("express");
const Socket = require("socket.io");
const cors = require("cors");
const db = require("./db");

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.get("/test", async (req, res) => {
	res.send("jhgjg");
});

//route for messages
app.use("/messages", require("./routes/message"));

const server = app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

const io = Socket(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	require("./socket")(socket, io);
});
