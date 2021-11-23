const router = require("express").Router();
const tag = require("../controllers/tagController");

router.use("/category/:category", tag.getTagsByCategory)
router.use("/", tag.getAllTags);


module.exports = router;
