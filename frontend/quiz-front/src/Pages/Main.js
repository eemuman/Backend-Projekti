import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Settings from "../Components/Settings";
import Play from "../Components/Play";

export default function Main() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [primaryLang, setPrimaryLang] = useState("");
  const [secondaryLang, setSecondaryLang] = useState("");
  const [amountofWords, setAmountofWords] = useState("");
  const [curTheme, setCurTheme] = useState("");

  useEffect(() => {
    if (!isPlaying) {
      setPrimaryLang("");
      setSecondaryLang("");
      setAmountofWords("");
      setCurTheme("");
    }
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
