require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../db');

const signUp = async (req, res) => {

   try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password )) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await db.User.findOne({ "email": email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await db.User.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
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
    res.status(201).json(user);
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
	signIn,
  signUp,
  verify,
};

// const signIn = (req, res) => {

//   // Authenticate User
//   const userId = req.body.id;
//   const payload = {
//     userId: userId,
//    };

//   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
//   res.json({
//     accessToken: accessToken
//   });
// }