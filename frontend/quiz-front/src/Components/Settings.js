import React, { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LangMenu from "./LangMenu";

export default function Settings(props) {
  const [primaryLang, setPrimaryLang] = useState("");
  const [secondaryLang, setSecondaryLang] = useState("");

  const handlePrimary = (e) => {
    setPrimaryLang(e.target.value);
  };

  const handleSecondary = (e) => {
    setSecondaryLang(e.target.value);
  };

  return (
    <div>
      <Box sx={{ bgcolor: "#cfe8fc" }}>
        <LangMenu
          labelId="Primary lang"
          id="Primary helper"
          label="Pääkieli"
          handle={handlePrimary}
          curLang={primaryLang}
          secondLang={secondaryLang}
          langs={props.langs}
          helperTxt="VALITSE PÄÄKIELI"
        ></LangMenu>

        <LangMenu
          labelId="Secondary lang"
          id="Secondary helper"
          label="Harjoiteltava"
          handle={handleSecondary}
          curLang={secondaryLang}
          secondLang={primaryLang}
          langs={props.langs}
          helperTxt="VALITSE HARJOITELTAVA"
        ></LangMenu>
      </Box>
    </div>
  );
}
