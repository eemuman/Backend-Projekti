import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import LangMenu from "./LangMenu";

export default function Settings(props) {
  const [primaryLang, setPrimaryLang] = useState(props.langs[0]);
  const [secondaryLang, setSecondaryLang] = useState(props.langs[1]);

  const handlePrimary = (e) => {
    setPrimaryLang(e.target.value);
  };

  const handleSecondary = (e) => {
    setSecondaryLang(e.target.value);
  };

  return (
    <div>
      <Box sx={{ bgcolor: "#cfe8fc" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Primary lang">Valitse pääkieli</InputLabel>
          <LangMenu
            labelId="Primary lang"
            id="Primary helper"
            label="Pääkieli"
            handle={handlePrimary}
            curLang={primaryLang}
            secondLang={secondaryLang}
            langs={props.langs}
          ></LangMenu>

          <FormHelperText>VALITSE PÄÄKIELI</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Secondary lang">Valitse harjoiteltava</InputLabel>
          <LangMenu
            labelId="Secondary lang"
            id="Secondary helper"
            label="Harjoiteltava"
            handle={handleSecondary}
            curLang={secondaryLang}
            secondLang={primaryLang}
            langs={props.langs}
          ></LangMenu>

          <FormHelperText>VALITSE HARJOITELTAVA</FormHelperText>
        </FormControl>
      </Box>
    </div>
  );
}
