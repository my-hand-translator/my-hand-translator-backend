const { SIGNUP } = require("../constants/error");

const createHttpError = require("../utils/createHttpError");

const validateGlossary = (req, res, next) => {
  const { glossary } = req.body;

  try {
    if (!glossary) {
      throw createHttpError(502, SIGNUP.NO_GLOSSARY, 1004);
    }

    const isValidGlossaryTargetLength = Object.values(glossary).every(
      ({ length }) => length > 0 && length <= 1000,
    );

    if (!isValidGlossaryTargetLength) {
      throw createHttpError(502, SIGNUP.INVALID_GLOSSARY_TARGET_LENGTH, 1007);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateGlossary;
