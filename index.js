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

app.get(`/word`, async (req, res) => {
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

app.get(`/word/:lang`, async (req, res) => {
  try {
    const allWordsLang = await vocab.getWordsLang(req.params.lang);
    res.send(allWordsLang);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post(`/theme`, async (req, res) => {
  try {
    const name = req.body.name;
    console.log(req.body.name);
    const addThemeData = await vocab.addNew(name, "themes");
    res.send("NEW THEME ADDED");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post(`/word`, async (req, res) => {
  try {
    await vocab.addNewWord(req.body.joinedValues, req.body.joinedKeys);
    res.send("SUCCESS?");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post(`/lang`, async (req, res) => {
  try {
    const name = req.body.name;
    console.log(req.body.name);
    const addThemeData = await vocab.addNew(name, "langs");
    const updNames = await vocab.updNames(name, false);
    res.send("NEW LANG ADDED");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete(`/theme`, async (req, res) => {
  try {
    const name = req.body.name;
    await vocab.deleteDataName("themes", name);
    await vocab.deleteWordByTheme(name);
    res.send(`SUCCESFULLY DELETED! ${name} FROM THEMES`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete(`/lang`, async (req, res) => {
  try {
    const name = req.body.name;
    console.log(req.body);
    await vocab.deleteDataName("langs", name);
    await vocab.updNames(name, true);
    res.send(`SUCCESFULLY DELETED! ${name} FROM LANGS`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete(`/word`, async (req, res) => {
  try {
    const name = req.body.name;
    const deleted = await vocab.deleteDataName("words", name);
    res.send(`SUCCESFULLY DELETED! ${name} FROM WORDS`);
  } catch (err) {
    res.status(400).send(err);
  }
});
