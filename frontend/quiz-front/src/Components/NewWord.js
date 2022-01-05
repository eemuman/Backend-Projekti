import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

import SendIcon from "@mui/icons-material/Send";
import { postWord } from "../Utils/AxiosUtils";

export default function NewWord(props) {
  const [newWord, setNewWord] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const newWordBase = { Theme: "" };
    props.langs.map((langg) => (newWordBase[langg.Name] = ""));
    setNewWord(newWordBase);
  }, [props.langs]);

  const handleChange = (index, e) => {
    const upd = newWord;
    upd[index] = e.target.value;
    setNewWord(upd);
    checkDisabled();
  };

  const handleTheme = (e) => {
    const upd = newWord;
    upd.Theme = e.target.value.name;
    setNewWord(upd);
    checkDisabled();
  };

  const handleClickkeri = () => {
    postWord(newWord);
  };

  const checkDisabled = () => {
    if (newWord.Suomi !== "" && newWord.Theme !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return newWord.length === 0 ? (
    <div>
      <h3>Loading...</h3>
    </div>
  ) : (
    <Grid container>
      {props.langs.map((test, index) => (
        <Grid key={index} item>
          <TextField
            fullWidth
            autoComplete="off"
            id={index.toString()}
            margin="normal"
            key={index}
            label={test.Name}
            variant="outlined"
            helperText={`Lisää sanan käännös kielelle ${test.Name}`}
            onChange={(e) => handleChange(test.Name, e)}
          />
        </Grid>
      ))}
      <Grid item>
        <FormControl sx={{ m: 3 }}>
          <InputLabel id={"THMLBL"}>Teema</InputLabel>
          <Select
            labelId="Theme"
            id="Themes"
            defaultValue=""
            label="teema"
            onChange={handleTheme}
          >
            {props.themes.map((theme, index) => (
              <MenuItem key={index} value={theme}>
                {theme.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>VALITSE SANAN TEEMA</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item>
        {" "}
        <FormControl sx={{ m: 1 }}>
          <Button
            style={{ width: 200, height: 60 }}
            disabled={isDisabled}
            variant="contained"
            color="success"
            onClick={handleClickkeri}
            endIcon={<SendIcon />}
          >
            LUO UUSI
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
}
