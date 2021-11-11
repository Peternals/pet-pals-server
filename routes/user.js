const router = require('express').Router();
const user = require('../controllers/userController');

// update user info
router.patch('/:id', user.updateUser);

// get a user
router.get('/:id', user.getUser);

module.exports = router;
