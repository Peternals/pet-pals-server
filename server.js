const express = require("express");
const db = require('./db');

const app = express();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
	console.log(`listening to port ${port}`);
});
