import React, { useState } from "react";
import Box from "@mui/material/Box";
import LangMenu from "./LangMenu";
import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

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
      <Box
        sx={{
          border: 1,
          borderRadius: 3,
          borderColor: "grey.400",
          flexGrow: 1,
          marginTop: "25px",
          bgcolor: "grey.50",
          boxShadow: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            borderBottom: 1,
            borderColor: "grey.400",
            padding: "5px",
          }}
          variant="h3"
          gutterBottom
          component="div"
        >
          ASETUKSET
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <LangMenu
              labelId="Primary lang"
              id="Primary helper"
              label="Kysymyskieli"
              handle={handlePrimary}
              curLang={primaryLang}
              secondLang={secondaryLang}
              langs={props.langs}
              helperTxt="VALITSE KYSYTTÄVÄN SANAN KIELI"
            />
          </Grid>
          <Grid item>
            <LangMenu
              labelId="Secondary lang"
              id="Secondary helper"
              label="Vastauskieli"
              handle={handleSecondary}
              curLang={secondaryLang}
              secondLang={primaryLang}
              langs={props.langs}
              helperTxt="VALITSE VASTATTAVAN SANAN KIELI"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
