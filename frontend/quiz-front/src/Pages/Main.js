import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Settings from "../Components/Settings";
import Play from "../Components/Play";
const axios = require("axios").default;

export default function Main() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [primaryLang, setPrimaryLang] = useState("");
  const [primaryWords, setPrimaryWords] = useState([]);
  const [secondaryWords, setSecondaryWords] = useState([]);
  const [secondaryLang, setSecondaryLang] = useState("");
  const [amountofWords, setAmountofWords] = useState("");
  const [curTheme, setCurTheme] = useState("");

  useEffect(() => {
    async function getWords() {
      console.log(curTheme);
      const wantedWords = await axios.get("http://localhost:8080/words", {
        params: {
          primLang: primaryLang,
          secondLang: secondaryLang,
          theme_id: curTheme,
          amountofWords: amountofWords,
        },
      });
      const primWords = wantedWords.data.map((word) => word[primaryLang]);
      const secWords = wantedWords.data.map((word) => word[secondaryLang]);

      console.log(primaryLang);
      setPrimaryWords(primWords);
      setSecondaryWords(secWords);
    }
    if (isPlaying) {
      getWords();
    }
    setPrimaryLang("");
    setSecondaryLang("");
    setAmountofWords("");
    setCurTheme("");
  }, [isPlaying]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
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
            setIsPlaying={setIsPlaying}
          />
        ) : (
          <Play
            primaryLang={primaryLang}
            primaryWords={primaryWords}
            secondaryWords={secondaryWords}
            secondaryLang={secondaryLang}
            amountofWords={amountofWords}
            curTheme={curTheme}
            setIsPlaying={setIsPlaying}
          ></Play>
        )}
      </Container>
    </React.Fragment>
  );
}
