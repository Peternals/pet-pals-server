const User = require("../models/User");
const bcrypt = require("bcrypt");
const { update } = require("../models/User");

// update user info
const updateUser = async (req, res) => {
  const request_data = req.body.data;
  const request_id = req.body._id;

  if (request_id === req.params.id) {
    // if a user want to change password we need to hash it again
    if (request_data.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        request_data.password = await bcrypt.hash(request_data.password, salt);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: request_data },
      { multi: true }
    );
    if (result.modifiedCount === 1) {
      const user = await User.findOne({ _id: req.params.id });
      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).send(other);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  updateUser,
  getUser,
};
