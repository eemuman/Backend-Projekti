const mysql = require("mysql");
const express = require("express");
var cors = require("cors");
require("dotenv").config();

config = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

const app = express();
app.use(express.static("frontend/quiz-front/build"));

var connection = mysql.createPool(config);
const server = app.listen(8080, () => {
  console.log("Yhteys upis");
});

app.use(express.json());
app.use(cors());

module.exports = {
  sConnection: mysql.createPool(config),
  connection: app,
};
