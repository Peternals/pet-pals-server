const router = require('express').Router();
const pet = require('../controllers/petController');

router.post('/', pet.addPet);
router.get('/:id', pet.getPet);
router.get('/owner/:owner_id', pet.getPetByOwnerId);
router.get('/type/:type', pet.getPetsByType);
router.patch('/:id',pet.updatePet);
router.delete('/:id', pet.deletePet);

module.exports = router;