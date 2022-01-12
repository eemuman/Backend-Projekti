const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const vocab = require("./Routes/Vocab");
const path = require("path");

/**
@FUNCTION
 * @module Index
 */

/**
 * TARKISTETAAN _AINA_ ENNEN POST/PATCH/DELETEÄ, ETTÄ KUTSUN TEKIJÄLLÄ ON VALIDI JWT TOKEN.
 * MIDDLEWARE
 * @param {*} req mistä kutsu tulee
 * @param {*} res vastaus
 * @param {*} next Mihin mennään seuraavaksi
 * @returns
 */
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECKEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

/**
@FUNCTION
 * Käytetään expressiä sekä haetaan buildattu frontti käyttöön
 */
const app = express();
app.use(express.static(path.join(__dirname, "frontend/quiz-front/build")));

/**
@FUNCTION
 * Käytetään joko herokun antamaa porttia tai sitten 8080.
 */
app.listen(process.env.PORT || 8080, () => {
  console.log("Yhteys upis");
});

app.use(express.json());

/**
@FUNCTION
 *
 * Haetaan teemat ja palautetaan ne frontendille
 */
app.get(`/themes`, async (req, res) => {
  try {
    const themes = await vocab.getWanted("themes");
    console.log(themes);
    res.send(themes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Haetaan kielet ja palautetaan ne frontendille
 */
app.get(`/langs`, async (req, res) => {
  try {
    const langs = await vocab.getWanted("langs");
    console.log(langs);
    res.send(langs);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Haetaan sanat, jos queryssä on kielet, teema ja sanojen määrä, niin haetaan käyttäen niitä parametrejä, muuten haetaan kaikki ja lähetetään ne frontendille.
 */
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

/**
@FUNCTION
 *
 * Haetaan kaikki sanat jotka löytyvät tietyllä kielellä.
 */
app.get(`/words/:lang`, async (req, res) => {
  try {
    const allWordsLang = await vocab.getWordsLang(req.params.lang);
    res.send(allWordsLang);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Luodaan uusi teema tietokantaan, haluttu nimi otetaan requestin bodystä.
 */
app.post(`/themes`, verifyToken, async (req, res) => {
  try {
    const name = req.body.name;
    console.log(req.body.name);
    const addThemeData = await vocab.addNew(name, "themes");
    console.log(addThemeData);
    res.status(201).send(addThemeData);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Luodaan uusi nimi tietokantaan, Halutut käännökset ja niitten kielet otetaan requestin bodystä, jossa ne on valmiiksi laitettu sql sopivaan muotoon.
 */
app.post(`/words`, verifyToken, async (req, res) => {
  try {
    const data = await vocab.addNewWord(
      req.body.joinedValues,
      req.body.joinedKeys
    );
    console.log(data);
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Luodaan uusi kieli tietokantaan, haluttu nimi otetaan requestin bodystä.
 * Samalla luodaan myös uusi kolumni sanojen tietokantaan, jotta kyseiselle kielelle voi lisätä käännöksiä.
 */
app.post(`/langs`, verifyToken, async (req, res) => {
  try {
    const name = req.body.name;
    const addThemeData = await vocab.addNew(name, "langs");
    console.log(addThemeData);
    await vocab.updNames(name, false);
    res.status(201).send(addThemeData);
  } catch (err) {
    res.status(400).send(err);
  }
});
/**
@FUNCTION
 *
 * Tällä poistetaan teemoja, ensiksi teemojen omasta tietokannasta, sekä sen jälkeen kaikki kyseisen teeman alla olevat sanat poistetaan sanojen tietokannasta.
 */
app.delete(`/themes`, verifyToken, async (req, res) => {
  try {
    const name = req.body.name;
    await vocab.deleteDataName("themes", name);
    await vocab.deleteWordByTheme(name);
    res.status(204).send(`SUCCESFULLY DELETED! ${name} FROM THEMES`);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Tällä poistetaan kieliä, ensiksi teemojen omasta tietokannasta, sekä sen jälkeen kyseinen kolumni sanojen tietokannasta, jotta niitä ei enään turhaan loju siellä.
 */
app.delete(`/langs`, verifyToken, async (req, res) => {
  try {
    const name = req.body.name;
    console.log(req.body);
    await vocab.deleteDataName("langs", name);
    await vocab.updNames(name, true);
    res.status(204).send(`SUCCESFULLY DELETED! ${name} FROM LANGS`);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Tällä voidaan päivittää sanan käännökset sekä teema. data sisältää jo valmiiksi sql komentomuodossa olevat muutokset, jotka on sitten helppo pätsää.
 */
app.patch(`/words`, verifyToken, async (req, res) => {
  try {
    const { id, data } = req.body;

    await vocab.updateWordById(id, data);
    res.status(202).send(`SUCCESFULLY UPDATED ID= ${id} WORD`);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Tällä voidaan poistaa sana käyttäen ID:tä.
 */
app.delete(`/words`, verifyToken, async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const deleted = await vocab.deleteWordById(id);
    res.status(204).send(`SUCCESFULLY DELETED! ID= ${id} FROM WORDS`);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
@FUNCTION
 *
 * Tätä käytetään kun koitetaan kirjautua sisään. Jos käyttäjänimi sekä salasana täsmäävät ja saadaan validi vastaus, luodaan JWT tokeni käyttäen käyttäjän idtä sekä erillistä secret keytä. J
 */
app.post(`/login`, async (req, res) => {
  const { username, password } = req.body;
  console.log("HERE");
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
/**
@FUNCTION
 *
 * Tällä voidaan varmistaa, että käyttäjän antama JWT tokeni on validi. Jos on, annetaan käyttäjän tehdä mitä haluaa, muuten estetään.
 */
app.get(`/login`, async (req, res) => {
  const token = req.query.token;
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
app.get("/*", async (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend/quiz-front/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
