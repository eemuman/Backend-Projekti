const express = require("express");
router = express.Router();
router.use(express.json());

const mysql = require("mysql");

config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

const connection = mysql.createPool(config);

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
