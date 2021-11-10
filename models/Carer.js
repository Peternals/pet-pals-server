const mongoose = require('mongoose');

const CarerSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Carer', CarerSchema);