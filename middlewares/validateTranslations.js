const { TRANSLATIONS } = require("../constants/error");
const createHttpError = require("../utils/createHttpError");

const validateTranslations = (req, res, next) => {
  const { text, translated, url } = req.body;

  try {
    if (!text) {
      throw createHttpError(502, TRANSLATIONS.NO_TEXT, 4001);
    }

    if (!translated) {
      throw createHttpError(502, TRANSLATIONS.NO_TRANSLATED, 4002);
    }

    if (!url) {
      throw createHttpError(502, TRANSLATIONS.NO_URL, 4003);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = validateTranslations;
