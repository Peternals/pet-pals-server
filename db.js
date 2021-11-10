require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", err => {
    console.log("Mongoose connection error:" + err.messsage);
});

db.once('open', () => {
    console.log("MongoDB Connected!");
});

module.exports = db;