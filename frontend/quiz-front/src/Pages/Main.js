import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Settings from "../Components/Settings";

export default function Main() {
  const [langs, setLangs] = useState(["Test", "Test2", "Test3", "Test4"]);
  const [amountofWords, setAmountofWords] = useState(0);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Settings langs={langs} setAmountofWords={setAmountofWords} />
      </Container>
    </React.Fragment>
  );
}
