const express = require("express");
const Socket = require("socket.io");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
	extended: true,
}));
app.use(morgan("dev"));
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/pet", require("./routes/pet"));

const port = process.env.PORT || 4000;

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
