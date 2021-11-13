const router = require('express').Router();
const pet = require('../controllers/petController');

router.post('/', pet.addPet);
router.get('/:id', pet.getPet);
router.get('/owner/:owner_id', pet.getPetByOwnerId);
router.patch('/:id',pet.updatePet);
router.delete('/:id', pet.deletePet);
router.get('/', pet.getAllPets);

module.exports = router;