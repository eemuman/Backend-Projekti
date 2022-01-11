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
      connection.query("SELECT * FROM word", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  getWordsLang: (lang) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM word WHERE ${lang} IS NOT NULL`,
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
          ? `SELECT ${primLang}, ${secondLang} FROM word WHERE ${primLang} IS NOT NULL AND ${secondLang} IS NOT NULL AND theme_id = "${theme_id}" ORDER BY RAND() LIMIT ${amountofWords}`
          : `SELECT ${primLang}, ${secondLang} FROM word WHERE ${primLang} IS NOT NULL AND ${secondLang} IS NOT NULL ORDER BY RAND() LIMIT ${amountofWords}`;

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

  addNewWord: (values, keys) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO word (${keys})  VALUES (${values})`;
      console.log(query);
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  updNames: (updName, isDelete) => {
    return new Promise((resolve, reject) => {
      const query = isDelete
        ? `ALTER TABLE word DROP COLUMN ${updName}`
        : `ALTER TABLE word ADD ${updName} varchar(255)`;
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

  deleteWordById: (whatToDelete) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM word WHERE id="${whatToDelete}"`;
      console.log(query);
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  deleteWordByTheme: (whatToDelete) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM word WHERE theme_id="${whatToDelete}"`;
      console.log(query);
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  updateWordById: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE word SET ${data} WHERE id=${id}`;
      console.log(query);
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  checkUser: (username, password) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM users WHERE username="${username}" AND password="${password}"`;
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};
