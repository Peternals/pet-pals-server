const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
	extended: true,
}));

app.use("/auth", require("./routes/auth"));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log(`listening to port ${port}`);
});


