const Translation = require("../models/Translation");
const createHttpError = require("../utils/createHttpError");
const { WORD } = require("../constants/error");

const SECOND_DECIMAL_POINT = 2;
const PERCENTAGE = 100;
const CRITERIA_SIMILARITY = 95;

const checkSimilarity = (targets, words) => {
  if (!targets) {
    return null;
  }

  for (let i = 0; i < targets.length; i += 1) {
    const { origin } = targets[i];
    const includedRate = Math.floor(
      (words.length / origin.length).toFixed(SECOND_DECIMAL_POINT) * PERCENTAGE,
    );

    if (includedRate >= CRITERIA_SIMILARITY) {
      return targets[i];
    }
  }

  return null;
};

const checkTranslated = async (req, res, next) => {
  try {
    const { words } = req.query;

    if (!words) {
      throw createHttpError(502, WORD.NO_WORD, 5001);
    }

    const translations = await Translation.find({ origin: { $regex: words } });
    const translation = checkSimilarity(translations, words);

    if (!translation) {
      return res.json({ result: "ok" });
    }

    return res.json({ result: "ok", data: translation.translated });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  checkTranslated,
};
