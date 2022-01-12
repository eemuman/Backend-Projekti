import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Settings from "../Components/Settings";
import Play from "../Components/Play";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

/**
 * @function
 * @module Main
 */

/**
 * @function
 * Pelin pelaamisen pääsivu, täällä hallitaan kaikki mitä tapahtuu pelisivuilla. Valitut kielet, teemat, sanojen määrät, pelataanko vai ei, onko sanoja tarpeeksi, pohjaArray vastauksille.
 * @returns Pelin pelaamiselmentti
 */
export default function Main() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [primaryLang, setPrimaryLang] = useState("");
  const [fetchedWords, setFetchedWords] = useState({});
  const [secondaryLang, setSecondaryLang] = useState("");
  const [amountofWords, setAmountofWords] = useState("");
  const [answArray, setAnswArray] = useState([]);
  const [curTheme, setCurTheme] = useState("");
  const [isFalse, setIsFalse] = useState(false);
  const navigate = useNavigate();

  /**
   * @function
   * Kun settings.js painetaan pelaa näppäintä, tällä haetaan halutut sanat tietokannasta. (Kielet, teema, määrä) Jos sanoja ei löydy tarpeeksi laitetaan isFalse trueksi, joka avaa alertin jossa lukee, että sanoja ei löytynyt halutuilla vaihtoehdoilla tarpeeks.
   */
  const fetchData = async () => {
    const wantedWords = await axios.get("/word", {
      params: {
        primLang: primaryLang,
        secondLang: secondaryLang,
        theme_id: curTheme,
        amountofWords: amountofWords,
      },
    });
    wantedWords.data.length === amountofWords
      ? setFetchedWords(wantedWords.data)
      : setIsFalse(true);
  };

  /**
   * @function
   * Kun siirrytään settings.js tiedostoon, halutaan, että kaikki vaihtoehdot ovat taas nollattuja. Se tehdään tällä funktiolla.
   */
  const resetAll = () => {
    setPrimaryLang("");
    setSecondaryLang("");
    setAmountofWords("");
    setCurTheme("");
    setIsFalse(false);
    setIsPlaying(false);
  };

  /**
   * @function
   * Jos painetaan hallintapaneeli näppäintä, tällä siirrytään kirjautumissivulle.
   */
  const goAdmin = () => {
    navigate(`/SignIn`);
  };

  /**
   * @function
   * Kun on haettu sanat ja niitä on haluttu määrä, tällä useEffectillä luodaan tyhjä AnswerArray joka on yhtä pitkä kun haluttujen sanojen array ja täytetään se (correct: false, disabled: false, data: "") objekteilla.
   */
  useEffect(() => {
    if (Object.keys(fetchedWords).length !== 0) {
      const test = Array(fetchedWords.length)
        .fill()
        .map(() => ({
          correct: false,
          disabled: false,
          data: "",
        }));
      setAnswArray(test);
      setIsPlaying(true);
    }
  }, [fetchedWords]);

  return (
    <React.Fragment>
      <CssBaseline />

      <Container fixed sx={{ p: "50px" }}>
        <Button onClick={goAdmin}>HALLINTAPANEELI</Button>

        {!isPlaying ? (
          <Settings
            primaryLang={primaryLang}
            setPrimaryLang={setPrimaryLang}
            secondaryLang={secondaryLang}
            setSecondaryLang={setSecondaryLang}
            amountofWords={amountofWords}
            setAmountofWords={setAmountofWords}
            curTheme={curTheme}
            setCurTheme={setCurTheme}
            fetchData={fetchData}
            false={isFalse}
            setFalse={setIsFalse}
          />
        ) : (
          <Play
            words={fetchedWords}
            answArray={answArray}
            setAnswArray={setAnswArray}
            primaryLang={primaryLang}
            secondaryLang={secondaryLang}
            curTheme={curTheme}
            setIsPlaying={resetAll}
            fetchData={fetchData}
          ></Play>
        )}
      </Container>
    </React.Fragment>
  );
}
