require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../db');
const User = require('../models/User')

const validation = async (req, res) => {

  try {
    // Get user input
    const { email, password } = req.body;
    console.log(req.body);

    // Validate user input
    if (!( email && password )) {
    res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.find({ "email": email });
    console.log(oldUser);
    if (oldUser.length) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    
    res.status(200).send("Please Continue");

  } catch (err) {
    console.log(err);
    res.status(403).send("Invalid User");
  }
};

const signUp = async (req, res) => {

   try {
    const { username, email, password, description, profile_picture, type } = req.body;

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username: username, 
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      description: description,
      profile_picture: profile_picture,
      type: type,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).send("Account is created successfully");
  } catch (err) {
    console.log(err);
  }
};

const signIn = async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await db.User.findOne({ "email": email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const verify = (req, res) => {
  res.status(200).send("Welcome 🙌 ");
}

module.exports = {
  validation,
	signIn,
  signUp,
  verify,
};