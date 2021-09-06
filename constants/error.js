const ERROR = {
  SIGNUP: {
    NO_EMAIL: "Email must be passed.",
    NO_NAME: "Name must be passed.",
    NO_KEYWORDS: "Keywords must be entered.",
    NO_GLOSSARY: "Glossary must be passed.",
    INVALID_EMAIL: "Email is invalid",
    INVALID_NAME_LENGTH: "Username's length is invalid.",
    INVALID_KEYWORD_LENGTH: "Keyword's length is invalid.",
    INVALID_GLOSSARY_TARGET_LENGTH: "Glossary's target length is invalid.",
    REGISTERED_USER: "Already registered user.",
    CANNOT_CREATE_USER: "Error occurred while creating user.",
    CANNOT_CREATE_GLOSSARY: "Error occurred while creating glossary.",
    CANNOT_CREATE_OR_UPDATE_KEYWORD:
      "Error occurred while creating or updating keyword.",
    UNKNOWN_DB_ERROR: "Unknown database error occurred.",
    MONGOOSE_ERROR: "Mongoose error occurred.",
  },
  LOGIN: {
    EMAIL_EMPTY: "Email must be passed.",
    EMAIL_INVALID: "Email is invalid.",
  },
};

module.exports = ERROR;
