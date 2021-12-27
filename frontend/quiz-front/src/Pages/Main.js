import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Settings from "../Components/Settings";

export default function Main() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Settings />
      </Container>
    </React.Fragment>
  );
}
