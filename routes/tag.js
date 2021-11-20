const router = require("express").Router();
const tag = require("../controllers/tagController");

router.use("/", tag.getAllTags);

module.exports = router;
