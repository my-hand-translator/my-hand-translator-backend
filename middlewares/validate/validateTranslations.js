const { GLOSSARY, TRANSLATIONS } = require("../../constants/error");
const createHttpError = require("../../utils/createHttpError");

const isValidUrl = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (error) {
    return false;
  }
};

module.exports.validateTranslation = (req, res, next) => {
  const { text, translated, url } = req.body;

  try {
    if (!text || !text.trim()) {
      throw createHttpError(502, TRANSLATIONS.NO_TEXT, 4001);
    }

    if (!translated || !translated.trim()) {
      throw createHttpError(502, TRANSLATIONS.NO_TRANSLATED, 4002);
    }

    if (!isValidUrl(url)) {
      throw createHttpError(502, TRANSLATIONS.NO_URL, 4003);
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports.validateTranslations = (req, res, next) => {
  const { translations } = req.body;

  for (let i = 0; i < translations.length; i += 1) {
    const translation = translations[i];
    const { text, translated, url, glossary } = translation;

    try {
      if (!text || !text.trim()) {
        throw createHttpError(502, TRANSLATIONS.NO_TEXT, 4001);
      }

      if (!translated || !translated.trim()) {
        throw createHttpError(502, TRANSLATIONS.NO_TRANSLATED, 4002);
      }

      if (!isValidUrl(url)) {
        throw createHttpError(502, TRANSLATIONS.NO_URL, 4003);
      }

      if (!glossary) {
        throw createHttpError(502, GLOSSARY.NO_GLOSSARY, 3000);
      }

      const isValidGlossaryTargetLength = Object.values(glossary).every(
        ({ length }) => length > 0 && length <= 1000,
      );

      if (!isValidGlossaryTargetLength) {
        throw createHttpError(
          502,
          GLOSSARY.INVALID_GLOSSARY_TARGET_LENGTH,
          3001,
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  return next();
};
