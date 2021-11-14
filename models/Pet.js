const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner_id: {
        type: String
    },
    description: {
        type: String,
        default: ""
    },
    pet_pictures: {
        type: String
    },
    request_ids: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('Pet', PetSchema);