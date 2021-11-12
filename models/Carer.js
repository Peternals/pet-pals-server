const mongoose = require('mongoose');

const CarerSchema = new mongoose.Schema({
    user_id: {
        type: String
    }
});

module.exports = mongoose.model('Carer', CarerSchema);