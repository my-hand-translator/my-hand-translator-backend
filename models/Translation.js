const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    origin: { type: String, required: true, minLength: 1 },
    translated: { type: String, required: true },
    url: {
      type: String,
      required: true,
    },
    glossary: {
      type: Map,
      of: { type: String, minLength: 1, maxLength: 1000 },
      required: true,
    },
  },
  { timestamps: { createdAt: true } },
);

const Translation = mongoose.model("Translation", translationSchema);

module.exports = Translation;
