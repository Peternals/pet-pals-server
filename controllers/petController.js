const Pet = require('../models/Pet');

// add pet info
const addPet = async (req, res) => {
    const pet = new Pet(req.body);
    try {
        const savedPet = await pet.save();
        res.status(200).send(savedPet);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// get pet info
const getPet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        res.status(200).send(pet);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// get pet info by ower_id
const getPetByOwnerId = async (req, res) => {
    try {
        const pet = await Pet.findOne({owner_id: req.params.owner_id});
        res.status(200).send(pet);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// update pet info
const updatePet = async (req, res) => {
    try {
        await Pet.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send('Pet info is successfully updated!');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// delete pet info
const deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(200).send('Pet info is successfully deleted!');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = {
    addPet,
    getPet,
    getPetByOwnerId,
    updatePet,
    deletePet
}