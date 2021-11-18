const User = require("../models/User");
const bcrypt = require("bcrypt");
const { update } = require("../models/User");

// update user info
const updateUser = async (req, res) => {
  //change this thing, might conflict with eiko's code
  const request_data = req.body;
  const request_id = req.body._id;
  console.log("1", request_id);
  console.log("2", req.params.id);
  console.log("3", request_data);

  if (request_id === req.params.id) {
    // if a user want to change password we need to hash it again
    if (request_data.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        request_data.password = await bcrypt.hash(request_data.password, salt);
				console.log(request_data.password);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
  try {
    console.log(request_data);
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: request_data },
      { multi: true }
    );
    console.log(result);
    if (result.modifiedCount === 1) {
      const user = await User.findOne({ _id: req.params.id });
      res.status(200).send(user);
    }
    // console.log(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// get a user
const getUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const x = await User.find();
    console.log(x);
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
