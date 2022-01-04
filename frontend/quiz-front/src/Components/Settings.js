import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LangMenu from "./LangMenu";
import { Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from "@mui/icons-material/Send";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
const axios = require("axios").default;

export default function Settings(props) {
  const [isDisabled, setDisabled] = useState(true);
  const [langs, setLangs] = useState([]);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const langs = await axios.get("http://localhost:8080/langs");
      setLangs(langs.data);
      const themes = await axios.get("http://localhost:8080/themes");
      setThemes(themes.data);
    }
    fetchAll();
  }, []);

  useEffect(() => {
    if (
      props.primaryLang !== "" &&
      props.secondaryLang !== "" &&
      props.amountofWords !== "" &&
      props.curTheme !== ""
    ) {
      setDisabled(false);
    }
  }, [
    props.primaryLang,
    props.secondaryLang,
    props.amountofWords,
    props.curTheme,
  ]);

  const handlePrimary = (e) => {
    props.setPrimaryLang(e.target.value.Name);
  };

  const handleSecondary = (e) => {
    props.setSecondaryLang(e.target.value.Name);
  };

  const handleAmount = (e) => {
    props.setAmountofWords(e.target.value);
  };

  const handleTheme = (e) => {
    props.setCurTheme(e.target.value.name);
  };

  const handleClickkeri = () => {
    props.fetchData();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setFalse(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
        open={props.false}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" variant="filled">
          {`Halutuilla vaihtoehdoilla ei löytynyt tarpeeksi sanoja! \n
          Yritä
          uudestaan!`}
        </Alert>
      </Snackbar>
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
          direction={{ xs: "column", sm: "column", md: "row" }}
        >
          <Grid item>
            <LangMenu
              labelId="Primary lang"
              id="Primary helper"
              label="Kysymyskieli"
              handle={handlePrimary}
              curLang={props.primaryLang}
              secondLang={props.secondaryLang}
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
              curLang={props.secondaryLang}
              secondLang={props.primaryLang}
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
                defaultValue=""
                label="Määrä"
                onChange={handleAmount}
              >
                <MenuItem value={1}>Yksi</MenuItem>
                <MenuItem value={3}>Kolme</MenuItem>
                <MenuItem value={5}>Viisi</MenuItem>
                <MenuItem value={7}>Seitsemän</MenuItem>
                <MenuItem value={10}>Kymmenen</MenuItem>
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
                defaultValue=""
                label="teema"
                onChange={handleTheme}
              >
                {themes.map((theme, index) => (
                  <MenuItem key={index} value={theme}>
                    {theme.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>VALITSE SANOJEN TEEMA</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1 }}>
              <Button
                style={{ width: 200, height: 60 }}
                disabled={isDisabled}
                variant="contained"
                color="success"
                onClick={handleClickkeri}
                endIcon={<SendIcon />}
              >
                PELAAMAAN
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
