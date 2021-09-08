const express = require("express");

const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateTranslations = require("../middlewares/validate/validateTranslations");
const validateUserIdParams = require("../middlewares/validate/validateUserIdParams");

const { createByUserId } = require("../controllers/translationController");

const router = express.Router();

router.post(
  "/:user_id",
  validateUserIdParams,
  validateGlossary,
  validateTranslations,
  createByUserId,
);

module.exports = router;
