const express = require("express");
const Socket = require("socket.io");
const cors = require("cors");
const db = require("./db");
const userRoute = require("./routes/user");

const app = express();
app.use(cors());

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
const port = process.env.PORT || 4000;

app.use("/auth", require("./routes/auth"));

app.get("/test", async (req, res) => {
	res.send("jhgjg");
});

//route for messages
app.use("/messages", require("./routes/message"));

//routes for users
app.use("/users", userRoute);

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
