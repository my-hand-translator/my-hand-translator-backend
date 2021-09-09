const express = require("express");

const router = express.Router();

const validateEmail = require("../middlewares/validate/validateEmail");
const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateUserIdParams = require("../middlewares/validate/validateUserIdParams");
const validatePagnation = require("../middlewares/validate/validatePagnation");
const {
  validateTranslation,
  validateTranslations,
} = require("../middlewares/validate/validateTranslations");

const {
  byUserId,
  createByUserId,
  synchronize,
} = require("../controllers/translationController");

router.get("/:user_id", validateUserIdParams, validatePagnation, byUserId);

router.post("/", validateEmail, validateTranslations, synchronize);

router.post(
  "/:user_id",
  validateUserIdParams,
  validateGlossary,
  validateTranslation,
  createByUserId,
);

module.exports = router;
