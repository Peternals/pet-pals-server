const mongoose = require("mongoose");
const CarerSchema = require("./Carer");
const OwnerSchema = require("./Owner");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  description: {
    type: String,
    default: "",
  },
  profile_picture: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
  },
  Carer: CarerSchema,
  Owner: OwnerSchema,
});

module.exports = mongoose.model("User", UserSchema, "Users");
