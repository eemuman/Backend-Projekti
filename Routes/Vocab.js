const express = require("express");
router = express.Router();
const conn = require("../connections");
router.use(express.json());
var connection = conn.sConnection;

module.exports = {
  getThemes: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM themes", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getLangs: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * From langs", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getAllWords: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM words", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getWordsLang: (lang) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM words WHERE ${lang} IS NOT NULL`,
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      );
    });
  },
  getWantedWords: (primLang, secondLang, theme_id) => {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        theme_id !== 0
          ? `SELECT ${primLang}, ${secondLang} FROM words WHERE ${primLang} IS NOT NULL AND ${secondLang} IS NOT NULL AND theme_id = ${theme_id}`
          : `SELECT ${primLang}, ${secondLang} FROM words WHERE ${primLang} IS NOT NULL AND ${secondLang} IS NOT NULL`;

      connection.query(sqlQuery, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};
