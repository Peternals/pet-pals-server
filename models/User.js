const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    description: {
        type: String,
        default: ""
    },
    profile_picture: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('User', UserSchema);