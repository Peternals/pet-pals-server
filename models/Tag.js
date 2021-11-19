const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  color: {
    type: String,
  },
  category: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Tag", TagSchema);
