import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Settings from "../Components/Settings";

export default function Main() {
  const [langs, setLangs] = useState(["Test", "Test2", "Test3", "Test4"]);
  const [primaryLang, setPrimaryLang] = useState(langs[0]);
  const [secondaryLang, setSecondaryLang] = useState(langs[1]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Settings
          primaryLang={primaryLang}
          setPrimaryLang={setPrimaryLang}
          secondaryLang={secondaryLang}
          setSecondaryLang={setSecondaryLang}
          langs={langs}
        />
      </Container>
    </React.Fragment>
  );
}
