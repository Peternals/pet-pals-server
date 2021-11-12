const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    pic_type: {
        type: String
    },
    filename: {
        type: String
    }
});

module.exports = mongoose.model('Picture', PictureSchema);