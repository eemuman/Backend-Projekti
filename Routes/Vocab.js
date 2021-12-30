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
};
