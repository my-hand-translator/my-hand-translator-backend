require("dotenv").config();
require("./db");

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createHttpError = require("./utils/createHttpError");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const glossariesRouter = require("./routes/glossaries");
const translationsRouter = require("./routes/translations");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/glossaries", glossariesRouter);
app.use("/translations", translationsRouter);

app.use((req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
