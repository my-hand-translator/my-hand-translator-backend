const emailValidator = require("email-validator");
const mongoose = require("mongoose");
const HttpError = require("http-errors");

const { SIGNUP } = require("../constants/error");
const Glossary = require("../models/Glossary");
const Keyword = require("../models/Keyword");

const User = require("../models/User");
const createHttpError = require("../utils/createHttpError");

const signup = async (req, res, next) => {
  const { email, name, keywords, glossary: glossaryInput } = req.body;

  try {
    if (!email) {
      throw createHttpError(502, SIGNUP.NO_EMAIL, 1000);
    }

    if (!emailValidator.validate(email)) {
      throw createHttpError(502, SIGNUP.INVALID_EMAIL, 1001);
    }

    if (!name) {
      throw createHttpError(502, SIGNUP.NO_NAME, 1002);
    }

    if (!(name.length >= 1 && name.length <= 100)) {
      throw createHttpError(502, SIGNUP.INVALID_NAME_LENGTH, 1002);
    }

    if (!keywords && keywords.length) {
      throw createHttpError(502, SIGNUP.NO_KEYWORDS, 1003);
    }

    const isValidKeywordLength = keywords.every(
      ({ length }) => length > 0 && length <= 100,
    );

    if (!isValidKeywordLength) {
      throw createHttpError(502, SIGNUP.INVALID_KEYWORD_LENGTH, 1005);
    }

    if (!glossaryInput) {
      throw createHttpError(502, SIGNUP.NO_GLOSSARY, 1004);
    }

    const isValidGlossaryTargetLength = Object.values(glossaryInput).every(
      ({ length }) => length > 0 && length <= 1000,
    );

    if (!isValidGlossaryTargetLength) {
      throw createHttpError(502, SIGNUP.INVALID_GLOSSARY_TARGET_LENGTH, 1007);
    }
  } catch (error) {
    return next(error);
  }

  try {
    const isExist = await User.exists({ email });

    if (isExist) {
      throw createHttpError(401, SIGNUP.REGISTERED_USER, 2003);
    }

    const user = await User.create({ email, name });

    if (!user) {
      createHttpError(500, SIGNUP.CANNOT_CREATE_USER, 2000);
    }

    const glossary = await Glossary.create({
      user,
      wordPairs: glossaryInput,
      keywords,
    });

    if (!glossary) {
      createHttpError(500, SIGNUP.CANNOT_CREATE_GLOSSARY, 2001);
    }

    const keywordsFound = await Promise.allSettled(
      keywords.map((keywordName) => Keyword.findOne({ name: keywordName })),
    );

    const keywordsCreated = keywordsFound.map((result, index) => {
      const keyword = result.value;

      if (keyword) {
        keyword.glossaries.push(glossary.id);
        return keyword.save();
      }

      return Keyword.create({
        name: keywords[index],
        glossaries: [glossary.id],
      });
    });

    const results = await Promise.allSettled(keywordsCreated);

    results.forEach((result) => {
      if (result.status === "rejected") {
        throw createHttpError(
          500,
          SIGNUP.CANNOT_CREATE_OR_UPDATE_KEYWORD,
          2002,
        );
      }
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    }

    if (error instanceof mongoose.Error) {
      return next(
        createHttpError(500, `${SIGNUP.MONGOOSE_ERROR} ${error.message}`, 2005),
      );
    }

    return next(createHttpError(500, SIGNUP.UNKNOWN_DB_ERROR, 2004));
  }

  return res.json({ result: "ok" });
};

module.exports = {
  signup,
};
