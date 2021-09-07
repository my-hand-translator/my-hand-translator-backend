const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

const createHttpError = require("../../utils/createHttpError");
const app = require("../../app");
const Translation = require("../../models/User");
const { TRANSLATIONS, SIGNUP } = require("../../constants/error");

describe("POST /translations/:user_id test", function cb() {
  this.timeout(10000);

  const db = mongoose.connection;
  const mockUserId = "something@gmail.com";

  const deleteMock = async () => {
    await Translation.findOneAndDelete({
      translated:
        "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
    });
  };

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      return setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  after(deleteMock);

  it("Should return an error if invalid user id format", (done) => {
    request(app)
      .post(`/translations/asdf`)
      .send({})
      .expect(400)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(400, TRANSLATIONS.INVALID_USER_ID, 4005),
        );

        return done();
      });
  });

  it("Should return an error if there is no glossary", (done) => {
    request(app)
      .post(`/translations/${mockUserId}`)
      .send({
        text: "As your app grows, you can catch a lot of bugs with typechecking.",
        translated:
          "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
        url: "http://www.naver.com",
      })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(502, SIGNUP.NO_GLOSSARY, 1004),
        );

        return done();
      });
  });

  it("Should return an error if there is invalid glossary", (done) => {
    request(app)
      .post(`/translations/${mockUserId}`)
      .send({
        text: "As your app grows, you can catch a lot of bugs with typechecking.",
        translated:
          "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
        url: "http://www.naver.com",
        glossary: {
          react: "",
        },
      })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(502, SIGNUP.INVALID_GLOSSARY_TARGET_LENGTH, 1007),
        );

        return done();
      });
  });

  it("Should return an error if there is no text", (done) => {
    request(app)
      .post(`/translations/${mockUserId}`)
      .send({
        translated:
          "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
        url: "http://www.naver.com",
        glossary: {
          react: "리액트",
        },
      })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(502, TRANSLATIONS.NO_TEXT, 4001),
        );

        return done();
      });
  });

  it("Should return an error if there is no translated", (done) => {
    request(app)
      .post(`/translations/${mockUserId}`)
      .send({
        text: "As your app grows, you can catch a lot of bugs with typechecking.",
        url: "http://www.naver.com",
        glossary: {
          react: "리액트",
        },
      })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(502, TRANSLATIONS.NO_TRANSLATED, 4002),
        );

        return done();
      });
  });

  it("Should return an error if there is no URL", (done) => {
    request(app)
      .post(`/translations/${mockUserId}`)
      .send({
        text: "As your app grows, you can catch a lot of bugs with typechecking.",
        translated:
          "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
        glossary: {
          react: "리액트",
        },
      })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(502, TRANSLATIONS.NO_URL, 4003),
        );

        return done();
      });
  });
});
