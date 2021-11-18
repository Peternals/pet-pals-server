const Pet = require("../models/Pet");

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).send(pets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addPet = async (req, res) => {
  try {
    const { name, description, pet_pictures, type, owner_id, questionnaire } =
      req.body;
    const savedPet = await Pet.create({
      name: name,
      description: description,
      pet_pictures: pet_pictures,
      type: type,
      owner_id: owner_id,
      questionnaire: questionnaire,
    });
    res.status(200).send(savedPet);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.status(200).send(pet);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getPetByOwnerId = async (req, res) => {
  try {
    const { user_id } = req.user;
    const pet = await Pet.findOne({ owner_id: user_id });
    res.status(200).send(pet);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getPetsByType = async (req, res) => {
  try {
    const pets = await Pet.find({ type: req.params.type.toLowerCase() });
    res.status(200).send(pets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updatePet = async (req, res) => {
  console.log("1", req.body);
  try {
    const resultImg = await Pet.updateOne(
      { _id: req.params.id },
      {
        $push: {
          pet_pictures: req.body.pet_pictures,
        },
      }
    );
    console.log("2", req.body);
    const result = await Pet.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
        },
      },
      { multi: true }
    );
    console.log("3", req.body);
    console.log("result:", result, "resultImg:", resultImg);
    if (result.modifiedCount === 1 || resultImg.modifiedCount === 1) {
      const pet = await Pet.findById(req.params.id);
      res.status(200).send(pet);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).send("Pet info is successfully deleted!");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// get all requests for pet

module.exports = {
  addPet,
  getPet,
  getPetByOwnerId,
  getPetsByType,
  updatePet,
  deletePet,
  getAllPets,
};
