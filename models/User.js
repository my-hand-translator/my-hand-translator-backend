const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: emailValidator.validate,
        message: "User's email is written in wrong format.",
      },
    },
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
