const router = require('express').Router();
const user = require('../controllers/userContoroller');

// update user info
router.patch('/:id', user.updateUser);

// get a user
router.get('/:id', user.getUser);

module.exports = router;
