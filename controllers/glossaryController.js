const Glossary = require("../models/Glossary");
const Keyword = require("../models/Keyword");

const { SERVER } = require("../constants/error");
const { RESULT } = require("../constants/responseMessages");
const createHttpError = require("../utils/createHttpError");

const editGlossary = async (req, res, next) => {
  const { glossary } = req.body;
  const { glossary_id: glossaryId } = req.params;

  try {
    await Glossary.findByIdAndUpdate(glossaryId, { wordPairs: glossary });
  } catch (error) {
    next(createHttpError(500, SERVER.INTERNAL_ERROR, 2005));
  }

  return res.json({ result: RESULT.OK });
};

const getGlossariesByKeyword = async (req, res, next) => {
  const { page, limit = 5 } = req.query;
  const { keyword } = req.query;

  let glossariesSearched = [];

  try {
    if (!keyword.trim()) {
      const glossaries = await Glossary.find()
        .populate("user")
        .sort({ updatedAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      glossariesSearched = glossaries.map((glossary) => ({
        userEmail: glossary.user.email,
        glossary: {
          wordPairs: glossary.wordPairs,
          keywords: glossary.keywords,
          updateAt: glossary.updatedAt,
        },
      }));
    } else {
      const keywords = await Keyword.find({ name: { $regex: keyword } })
        .populate({ path: "glossaries", populate: { path: "user" } })
        .lean()
        .exec();

      const glossariesByPage = [
        ...new Set(
          keywords.map((keywordDocument) => keywordDocument.glossaries).flat(),
        ),
      ];

      glossariesSearched = glossariesByPage.slice(
        limit * (page - 1),
        limit * page,
      );
    }

    const convertedGlossaries = glossariesSearched.map((glossary) => ({
      userEmail: glossary.user.email,
      glossary: {
        wordPairs: glossary.wordPairs,
        keywords: glossary.keywords,
        updatedAt: glossary.updatedAt,
      },
    }));

    return res.json({
      result: RESULT.OK,
      data: convertedGlossaries,
    });
  } catch (error) {
    return next(createHttpError(500, SERVER.INTERNAL_ERROR, 4010));
  }
};

module.exports = {
  editGlossary,
  getGlossariesByKeyword,
};
