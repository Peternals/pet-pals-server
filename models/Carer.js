const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    pet_id: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    status: {
        type: String
    },
    answers: [
        {
            type: String
        }
    ]
})

const CarerSchema = new mongoose.Schema({
    requests: [RequestSchema]
});

module.exports = CarerSchema;