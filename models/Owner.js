const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Owner', OwnerSchema);