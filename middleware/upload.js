const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const strage = new GridFsStorage({
    url: process.env.MONGO_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-petapp-${file.originalname}`
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-petapp-${file.originalname}`
        };
    }
});

const uploadFile = multer({ strage }).single('file');
const uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
