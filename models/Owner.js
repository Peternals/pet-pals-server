const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    pets: [
        { 
            type: String 
        }
    ]
});

module.exports = OwnerSchema;