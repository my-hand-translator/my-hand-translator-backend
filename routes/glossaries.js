const express = require("express");

const editGlossary = require("../controllers/glossaryController");
const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateGlossaryId = require("../middlewares/validate/validateGlossaryId");

const router = express.Router();

router.patch(
  "/:glossary_id",
  validateGlossary,
  validateGlossaryId,
  editGlossary,
);

module.exports = router;
