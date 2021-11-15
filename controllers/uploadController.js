const upload = require("../middleware/upload");
const mongoose = require("mongoose");

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
});

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    // console.log(req.file);
    console.log(req.files);

    // if (req.file === undefined) {
    //   return res.send("You must select a file.");
    // }
    // return res.send(req.file);

    if (req.files.length <= 0) {
      res.status(400).send("You must select at least 1 file.");
    }
    res.status(200).send(req.files);
  } catch (err) {
    console.log(err);

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      res.status(400).send("Too many files upload.");
    }

    return res.status(500).send(err);
  }
};

const getSingleImage = async (req, res) => {
  try {
    await gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteImage = async (req, res) => {
  try {
    await gfs.delete(new mongoose.Types.ObjectId(req.params.id));
    res.status(200).send("File has been deleted.");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  uploadFiles,
  getSingleImage,
  deleteImage,
};
