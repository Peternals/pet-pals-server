const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    user_id: {
        type: String
    }
});

module.exports = mongoose.model('Owner', OwnerSchema);