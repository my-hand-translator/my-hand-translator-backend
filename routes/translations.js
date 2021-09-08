const express = require("express");

const router = express.Router();

const validateEmail = require("../middlewares/validate/validateEmail");
const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateUserIdParams = require("../middlewares/validate/validateUserIdParams");
const {
  validateTranslation,
  validateTranslations,
} = require("../middlewares/validate/validateTranslations");

const {
  createByUserId,
  synchronize,
} = require("../controllers/translationController");

router.post("/", validateEmail, validateTranslations, synchronize);

router.post(
  "/:user_id",
  validateUserIdParams,
  validateGlossary,
  validateTranslation,
  createByUserId,
);

module.exports = router;
