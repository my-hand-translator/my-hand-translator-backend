const Glossary = require("../models/Glossary");

const createHttpError = require("../utils/createHttpError");
const { DB } = require("../constants/error");

const editGlossary = async (req, res, next) => {
  const { glossary } = req.body;
  const { glossary_id: glossaryId } = req.params;

  try {
    await Glossary.findByIdAndUpdate(glossaryId, { wordPairs: glossary });
  } catch (error) {
    next(createHttpError(500, `${DB.MONGOOSE_ERROR} ${error.message}`, 2005));
  }

  return res.json({ result: "ok" });
};

module.exports = editGlossary;
