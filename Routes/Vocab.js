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
  getWanted: (wanted) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT name FROM ${wanted}`;
      connection.query(query, (err, res) => {
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
  getWantedWords: (primLang, secondLang, theme_id, amountofWords) => {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        theme_id !== 0
          ? `SELECT ${primLang}, ${secondLang} FROM words WHERE ${primLang} IS NOT NULL AND ${secondLang} IS NOT NULL AND theme_id = "${theme_id}" ORDER BY RAND() LIMIT ${amountofWords}`
          : `SELECT ${primLang}, ${secondLang} FROM words WHERE ${primLang} IS NOT NULL AND ${secondLang} IS NOT NULL ORDER BY RAND() LIMIT ${amountofWords}`;

      connection.query(sqlQuery, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  addNew: (nameToAdd, whereToAdd) => {
    return new Promise((resolve, reject) => {
      console.log(`INSERT INTO ${whereToAdd} (name) VALUES ("${nameToAdd}")`);
      const query = `INSERT INTO ${whereToAdd} (name) VALUES ("${nameToAdd}")`;
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  updNames: (updName, isDelete) => {
    return new Promise((resolve, reject) => {
      const query = isDelete
        ? `ALTER TABLE words DROP COLUMN ${updName}`
        : `ALTER TABLE words ADD ${updName} varchar(255)`;
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  deleteDataName: (whereToDelete, whatToDelete) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM ${whereToDelete} WHERE  name="${whatToDelete}"`;
      console.log(query);
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};
