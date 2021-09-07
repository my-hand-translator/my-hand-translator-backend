const express = require("express");

const validateGlossary = require("../middlewares/validateGlossary");
const validateTranslations = require("../middlewares/validateTranslations");
const validateUserIdParams = require("../middlewares/validateUserIdParams");

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
