const express = require("express");
var cors = require("cors");
require("dotenv").config();
const vocab = require("./Routes/Vocab");

const app = express();
//app.use(express.static("frontend/quiz-front/build"));

app.listen(8080, () => {
  console.log("Yhteys upis");
});

app.use(express.json());
app.use(cors());

app.get(`/theme`, async (req, res) => {
  try {
    const themes = await vocab.getWanted("themes");
    console.log(themes);
    res.send(themes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.get(`/lang`, async (req, res) => {
  try {
    const langs = await vocab.getWanted("langs");
    console.log(langs);
    res.send(langs);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get(`/words`, async (req, res) => {
  console.log(req.query);
  try {
    if (req.query.primLang != null && req.query.secondLang != null) {
      if (req.query.theme_id == null) req.query.theme_id = 0;
      const wantedWords = await vocab.getWantedWords(
        req.query.primLang,
        req.query.secondLang,
        req.query.theme_id,
        req.query.amountofWords
      );
      res.send(wantedWords);
    } else {
      const allWords = await vocab.getAllWords();
      res.send(allWords);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get(`/words/:lang`, async (req, res) => {
  try {
    const allWordsLang = await vocab.getWordsLang(req.params.lang);
    res.send(allWordsLang);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post(`/theme`, async (req, res) => {
  try {
    const name = req.query.name;
    const addThemeData = await vocab.addNew(name, "themes");
    const updNames = await vocab.updNames(name, false);
    res.send(addThemeData, updNames);
  } catch (err) {
    res.status(400).send(err);
  }
});
