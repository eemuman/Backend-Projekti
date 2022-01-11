const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const vocab = require("./Routes/Vocab");
const path = require("path");

const app = express();
app.use(express.static("frontend/quiz-front/build"));

app.listen(process.env.PORT || 8080, () => {
  console.log("Yhteys upis");
});

app.use(express.json());

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

app.patch(`/word`, async (req, res) => {
  try {
    const { id, data } = req.body;

    await vocab.updateWordById(id, data);
    res.send(`SUCCESFULLY UPDATED ID= ${id} WORD`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete(`/word`, async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const deleted = await vocab.deleteWordById(id);
    res.send(`SUCCESFULLY DELETED! ID= ${id} FROM WORDS`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post(`/login`, async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await vocab.checkUser(username, password);
    if (user.length > 0) {
      const userToken = jwt.sign({ id: user.id }, process.env.SECKEY);
      res.json({
        username: user.username,
        accesToken: userToken,
      });
    }
    res.status(401).send("INVALIDUSERPASS");
  } catch (err) {}
});

app.get(`/login`, async (req, res) => {
  console.log(req.query);
  const token = req.query.curUser;
  if (!token) {
    res.status(400).send("INVALID TOKEN");
  }
  try {
    const validateToken = jwt.verify(token, process.env.SECKEY);
    if (validateToken) {
      res.status(200).send("TOKEN VALIDATED");
    }
    res.status(401).send("INVALIDTOKEN");
  } catch (err) {}
});
