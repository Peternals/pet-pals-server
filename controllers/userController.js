const User = require('../models/User');
const bcrypt = require('bcrypt');

// update user info
const updateUser = async (req, res) => {
    if (req.body.id === req.params.id) {
        // if a user want to change password we need to hash it again
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).send(err);
            }
        }
    }
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).send('Account is successfully updated!');
    } catch (err) {
        res.status(500).send(err);
    }
};

// get a user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).send(other);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    updateUser,
    getUser
}
