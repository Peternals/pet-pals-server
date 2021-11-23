const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();

const storage = new GridFsStorage({
	url: process.env.MONGO_URL,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	file: (req, file) => {
		const match = ["image/png", "image/jpeg", "image/gif"];

		if (match.indexOf(file.mimetype) === -1) {
			const filename = `${Date.now()}-petapp-${file.originalname}`;
			return filename;
		}

		return {
			bucketName: "photos",
			filename: `${Date.now()}-petapp-${file.originalname}`,
		};
	},
});

const uploadFiles = multer({ storage }).array("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
