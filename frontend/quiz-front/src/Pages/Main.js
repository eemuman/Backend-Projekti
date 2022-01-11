import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Settings from "../Components/Settings";
import Play from "../Components/Play";
import { useNavigate } from "react-router-dom";

const axios = require("axios").default;

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

  const fetchData = async () => {
    const wantedWords = await axios.get("http://localhost:8080/word", {
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

  const resetAll = () => {
    setPrimaryLang("");
    setSecondaryLang("");
    setAmountofWords("");
    setCurTheme("");
    setIsFalse(false);
    setIsPlaying(false);
  };

  const goAdmin = () => {
    navigate(`/SignIn`);
  };

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

      <Container fixed>
        <Button onClick={goAdmin} sx={{ marginBottom: "-40px" }}>
          HALLINTAPANEELI
        </Button>

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
          ></Play>
        )}
      </Container>
    </React.Fragment>
  );
}
