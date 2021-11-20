const Tag = require("../models/Tag");

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).send(tags);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAllTags };
