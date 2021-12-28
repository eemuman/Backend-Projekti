import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Settings from "../Components/Settings";

export default function Main() {
  const [primaryLang, setPrimaryLang] = useState("");
  const [secondaryLang, setSecondaryLang] = useState("");
  const [amountofWords, setAmountofWords] = useState("");
  const [curTheme, setCurTheme] = useState("");
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Settings
          primaryLang={primaryLang}
          setPrimaryLang={setPrimaryLang}
          secondaryLang={secondaryLang}
          setSecondaryLang={setSecondaryLang}
          amountofWords={amountofWords}
          setAmountofWords={setAmountofWords}
          curTheme={curTheme}
          setCurTheme={setCurTheme}
        />
      </Container>
    </React.Fragment>
  );
}
