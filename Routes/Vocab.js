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

/**
@FUNCTION
 * @module Vocab
 */

module.exports = {
  /**
@FUNCTION
   *
   * Haetaan halutun tietokannan name tiedot. Käytetään kielten ja teemojen hakuun.
   * @param {*} wanted Halutun tietokannan nimi
   * @returns Halutun tietokannan nimi kolumni.
   */
  getWanted: (wanted) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT name FROM ${wanted}`;
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  /**
@FUNCTION
   *
   * Haetaan kaikki sanat mitä sana-tietokannasta löytyy.
   * @returns Kaikki sanat mitä tietokannassa on.
   */
  getAllWords: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM word", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  /**
@FUNCTION
   *
   * Haetaan kaikki sanat millä on tietyn kielen käännös.
   * @param {*} lang Mitä kieltä haetaan
   * @returns Kaikki kyseisen kielen sisältävät sanat.
   */
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
  /**
@FUNCTION
   *
   * Haetaan sanat käyttäen haluttuja kieliä, teemaa ja sanojen määrää. Järjestellään ne randomilla, jotta joka kerta ei pelattaessa tule samoja sanoja. Tätä käytetään kun pelataan.
   * Jos theme_id on 0, on valittu kaikki teemat, joten otetaan ilman erillistä teeman määrittelyä.
   * @param {*} primLang Kieli mikä valittiin aloituskieleksi
   * @param {*} secondLang Kieli mitä halutaan oppia
   * @param {*} theme_id Minkä teeman sanoja on
   * @param {*} amountofWords Kuinka monta sanaa halutaan
   * @returns Haettu data
   */
  getWantedWords: (primLang, secondLang, theme_id, amountofWords) => {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        theme_id !== 0
          ? `SELECT ${primLang}, ${secondLang} FROM word WHERE ${primLang} <> '' AND ${secondLang} <> '' AND theme_id = "${theme_id}" ORDER BY RAND() LIMIT ${amountofWords}`
          : `SELECT ${primLang}, ${secondLang} FROM word WHERE ${primLang} <> ''  AND ${secondLang} <> ''  ORDER BY RAND() LIMIT ${amountofWords}`;

      connection.query(sqlQuery, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  /**
@FUNCTION
   *
   * Tällä lisätään kieliin sekä teemoihin uusia kieliä/teemoja.
   * @param {*} nameToAdd Halutun lisäyksen nimi
   * @param {*} whereToAdd Lisätäänkö kieli vai teema.
   * @returns Haettu data
   */
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

  /**
@FUNCTION
   *
   * Tällä luodaan uusia sanoja tietokantaan. Values ja keys on valmiiksi laitettu sql sopivaan muotoon aina ihan frontendissä asti.
   * @param {*} values Uuden sanan käännökset sekä teema
   * @param {*} keys Kielten nimet, theme_id, jne..
   * @returns Haettu data
   */
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
  /**
@FUNCTION
   *
   * Tätä käytetään kun poistetaan tai lisätään kieli, eli tällä poistetaan tai lisätään sana-tietokantaan kolumni halutulla nimellä.
   * @param {*} updName Haluttu nimi
   * @param {*} isDelete Onko kyseessä poisto vai lisäys.
   * @returns Haettu data
   */
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
  /**
@FUNCTION
   *
   * Tällä poistetaan kielet tai teemat niiden omista tietokannoistaan.
   * @param {*} whereToDelete Mistä poistetaan (kieli/teema)
   * @param {*} whatToDelete Mitä poistetaan (nimi)
   * @returns Haettu data
   */
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
  /**
@FUNCTION
   *
   * Tällä poistetaan sana ID:tä käyttäen
   * @param {*} whatToDelete Halutun sanan ID
   * @returns Haettu data
   */
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
  /**
@FUNCTION
   *
   * Kun poistetaan teema, käytetään tätä siihen, että poistetaan sanat-tietokannasta halutun teeman alla olevat sanat.
   * @param {*} whatToDelete Poistettavan teeman nimi
   * @returns Haettu data
   */
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

  /**
@FUNCTION
   *
   * Tällä funktiolla päivitetään sana tietokantaan ID:tä käyttäen.. Data sisältää varmiiksi SQL-sopivan komentosarjan päivittämiselle.
   * @param {*} id Päivitettävän sanan ID
   * @param {*} data Uusi päivitetty data
   * @returns Haettu data
   */
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

  /**
@FUNCTION
   *
   * Tällä tarkistetaan kirjautumisen yhteydessä mätsäävätkö annetut tiedot tietokannan tietoihin. inputit sanitisioidaan, koska ilman niitä pystyi kirjautumaan " or""=" käyttäen.
   * @param {*} username annettu käyttäjänimi
   * @param {*} password annettu salasana
   * @returns löytyykö käyttäjä
   */
  checkUser: (username, password) => {
    return new Promise((resolve, reject) => {
      const sanName = connection.escape(username);
      const sanPass = connection.escape(password);
      const query = `SELECT * FROM users WHERE username=${sanName} AND password=${sanPass}`;
      connection.query(query, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
};
