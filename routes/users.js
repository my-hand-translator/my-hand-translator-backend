const express = require("express");

const validateEmail = require("../middlewares/validate/validateEmail");
const validateGlossary = require("../middlewares/validate/validateGlossary");
const validateKeywords = require("../middlewares/validate/validateKeywords");
const validateUsername = require("../middlewares/validate/validateUsername");

const { signup, login } = require("../controllers/userController");

const router = express.Router();

router.post(
  "/signup",
  validateEmail,
  validateGlossary,
  validateKeywords,
  validateUsername,
  signup,
);

router.post("/login", validateEmail, login);

module.exports = router;
