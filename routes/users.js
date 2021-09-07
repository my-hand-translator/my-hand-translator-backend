const express = require("express");

const validateEmail = require("../middlewares/validateEmail");
const validateGlossary = require("../middlewares/validateGlossary");
const validateKeywords = require("../middlewares/validateKeywords");
const validateUsername = require("../middlewares/validateUsername");

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
