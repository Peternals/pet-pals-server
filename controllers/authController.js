require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = [
  {
    id: "1",
    email: 'eiko@gmail.com',
    password: '12345',
  },
]

const signIn = (req, res) => {

  // Authenticate User
  const userId = req.body.id;
  const payload = {
    userId: userId,
   };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  res.json({
    accessToken: accessToken
  });
}

signIn()

module.exports = {
	signIn,
};