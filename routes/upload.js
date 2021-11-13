const router = require('express').Router();
const upload = require('../controllers/uploadController');

router.post('/upload', upload.uploadFiles);
router.get('/:filename', upload.getSingleImage);
router.delete('/:id', upload.deleteImage);

module.exports = router;