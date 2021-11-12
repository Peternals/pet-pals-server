const upload = require('../middleware/upload');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
//const GridFSBucket = require('mongodb').GridFSBucket;

const url = process.env.MONGO_URL;

//const mongoClient = new MongoClient(url);




const uploadFiles = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.file);

        if (req.file === undefined) {
            return res.send('You must select a file.')
        }

        return res.send("File has been uploaded!");

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

module.exports = {
    uploadFiles
}