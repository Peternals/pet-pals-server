const upload = require('../middleware/upload');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
//const GridFSBucket = require('mongodb').GridFSBucket;

const url = process.env.MONGO_URL;
const baseUrl = "http://localhost:4000/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.file)

        if (req.file === undefined) {
            return res.send('You must select a file.')
        }

        return res.send("File has been uploaded!");

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getFiles = async (req, res) => {
    try {
        await mongoClient.connect();
        
        const database = mongoClient.db(process.env.DB)
        const images = database.collection("photos.files");
        
        const cursor = images.find({});
        
        if ((await cursor.count()) === 0) {
            return res.status(500).send('No files found.');
        }

        let fileInfo = [];
        await cursor.forEach((doc) => {
            fileInfo.push({
                name: doc.filename,
                url: baseUrl + doc.filename
            });
        });
        return res.status(200).send(fileInfo);

    } catch(err) {
        return res.status(500).send(err);
    }
};


module.exports = {
    uploadFiles,
    getFiles
}