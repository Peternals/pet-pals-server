const router = require("express").Router();
const pet = require("../controllers/petController");
const verifyToken = require("../middleware/verifyToken");

router.use("/", verifyToken);

router.get("/", pet.getAllPets);
router.post("/", pet.addPet);
router.get("/owner", pet.getPetByOwnerId);
router.get("/type/:type", pet.getPetsByType);
router.get("/tag/single", pet.getPetsBySingleTag);
router.get("/tag/all", pet.getPetsByAllTag);
router.get("/:id", pet.getPet);
router.patch("/:id", pet.updatePet);
router.patch("/:id/question", pet.deleteQuestionnaire);
router.patch("/:id/tag", pet.deleteTag);
router.delete("/:id", pet.deletePet);

module.exports = router;
