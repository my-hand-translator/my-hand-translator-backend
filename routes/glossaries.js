const express = require("express");
const editGlossary = require("../controllers/glossaryController");
const validateGlossary = require("../middlewares/validateGlossary");

const router = express.Router();

router.patch("/:glossary_id", validateGlossary, editGlossary);

module.exports = router;
