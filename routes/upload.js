const router = require('express').Router();
const upload = require('../controllers/uploadController');

router.post('/upload', upload.uploadFiles);
router.get('/files', upload.getFiles);

module.exports = router;