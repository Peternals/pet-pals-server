const Pet = require("../models/Pet");
const User = require("../models/User");
//if approve or rejected
const modifyRequest = async (req, res) => {
  try {
    const { request_id, user_id, action } = req.body;
    await User.updateOne(
      { "Carer.requests._id": request_id, _id: user_id },
      { $set: { "Carer.requests.$.status": action } }
    );
    console.log(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
//get requests
const getRequestsForPet = async (req, res) => {
  try {
    const { user_id } = req.user;
    console.log(user_id);

    const userPets = await Pet.find({ owner_id: user_id }, { _id: 1 });
    const petsIds = userPets.map((id) => id._id.toString());
    const request = await User.aggregate([
      {
        $unwind: "$Carer.requests",
      },
      {
        $match: {
          "Carer.requests.status": req.params.status,
          "Carer.requests.pet_id": { $in: petsIds },
        },
      },
      {
        $project: {
          _id: "$_id",
          request: "$Carer.requests",
          username: "$username",
          profile_picture: "$profile_picture",
        },
      },
    ]);
    res.send(request);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

//add request
const addRequest = async (req, res) => {
  try {
    const { user_id } = req.user;
    await User.updateOne({ _id: user_id }, { $set: req.body });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  modifyRequest,
  getRequestsForPet,
  addRequest,
};
