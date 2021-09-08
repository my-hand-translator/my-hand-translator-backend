const createHttpError = require("../utils/createHttpError");

const Translation = require("../models/Translation");
const { SERVER } = require("../constants/error");
const { RESULT } = require("../constants/responseMessages");

const createByUserId = async (req, res, next) => {
  try {
    const { user_id: userId } = req.params;
    const { text, translated, url, glossary } = req.body;

    await Translation({
      user: userId,
      origin: text,
      translated,
      url,
      glossary,
    }).save();

    return res.json({ result: RESULT.OK });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR));
  }
};

const synchronize = async (req, res, next) => {
  const { email, translations } = req.body;
  const bulkData = [];

  for (let i = 0; i < translations.length; i += 1) {
    const translation = translations[i];

    bulkData.push({
      updateOne: {
        filter: { user: email, origin: translation.text },
        update: { user: email, ...translation },
        upsert: true,
      },
    });
  }

  try {
    await Translation.bulkWrite(bulkData);

    return res.json({ result: RESULT.OK });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR));
  }
};

module.exports = {
  createByUserId,
  synchronize,
};
