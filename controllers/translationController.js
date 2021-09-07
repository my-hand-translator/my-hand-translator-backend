const createHttpError = require("../utils/createHttpError");

const Translation = require("../models/Translation");
const { DB } = require("../constants/error");
const { COMMON } = require("../constants/responseMessages");

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

    return res.json(COMMON);
  } catch (error) {
    return next(createHttpError(500, DB.MONGOOSE_ERROR));
  }
};

module.exports = {
  createByUserId,
};
