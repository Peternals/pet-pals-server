const express = require("express");
const Socket = require("socket.io");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const Grid = require("gridfs-stream");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
	extended: true,
}));
app.use(morgan("dev"));
app.use(cors());

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("photos");
});

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/pet", require("./routes/pet"));
app.use("/pic", require("./routes/upload"));

// get single image
app.get("/file/:filename", async (req, res) => {
	try {
		const file = await gfs.files.findOne({ filename: req.params.filename });
		const readStream = gfs.createReadStream({filename: file.filename});
		readStream.pipe(res);
	} catch (error) {
		res.status(500).send("not found");
	}
});

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
