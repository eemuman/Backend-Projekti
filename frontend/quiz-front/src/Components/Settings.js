import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LangMenu from "./LangMenu";
import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";

export default function Settings(props) {
  const [primaryLang, setPrimaryLang] = useState("");
  const [secondaryLang, setSecondaryLang] = useState("");
  const [amountofWords, setAmountofWords] = useState("");
  const [curTheme, setCurTheme] = useState("");
  const [langs, setLangs] = useState([]);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    setLangs(["Test", "Test2", "Test3", "Test4"]);
    setThemes(["Kaikki", "Eläimet", "Värit", "Numerot"]);
  }, []);

  const handlePrimary = (e) => {
    setPrimaryLang(e.target.value);
  };

  const handleSecondary = (e) => {
    setSecondaryLang(e.target.value);
  };

  const handleAmount = (e) => {
    setAmountofWords(e.target.value);
  };

  const handleTheme = (e) => {
    setCurTheme(e.target.value);
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
          spacing={1}
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
              langs={langs}
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
              langs={langs}
              helperTxt="VALITSE VASTATTAVAN SANAN KIELI"
            />
          </Grid>

          <Grid item>
            <div>Sanojen määrä</div>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id={"WORDLBL"}>Määrä</InputLabel>
              <Select
                labelId="Amount of Words"
                id="AmountofWords"
                value={amountofWords}
                label="Määrä"
                onChange={handleAmount}
              >
                <MenuItem value={5}>Viisi</MenuItem>
                <MenuItem value={10}>Kymmenen</MenuItem>
                <MenuItem value={15}>Viisitoista</MenuItem>
                <MenuItem value={20}>Kaksikymmentä</MenuItem>
              </Select>
              <FormHelperText>VALITSE HALUTTU MÄÄRÄ SANOJA</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <div>Sanojen teema</div>

            <FormControl sx={{ m: 1 }}>
              <InputLabel id={"THMLBL"}>Teema</InputLabel>
              <Select
                labelId="Theme"
                id="Themes"
                value={curTheme}
                label="teema"
                onChange={handleTheme}
              >
                {themes.map((theme, index) => (
                  <MenuItem key={index} value={index}>
                    {theme}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>VALITSE SANOJEN TEEMA</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
