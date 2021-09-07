const validator = require("email-validator");

const { LOGIN } = require("../constants/error");
const createHttpError = require("../utils/createHttpError");

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw createHttpError(502, LOGIN.EMAIL_EMPTY, 1000);
    }

    if (!validator.validate(email)) {
      throw createHttpError(502, LOGIN.EMAIL_INVALID, 1001);
    }
  } catch (error) {
    next(error);
  }

  return next();
};

module.exports = validateEmail;
