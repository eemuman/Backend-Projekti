import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function NewWord(props) {
  const [newWord, setNewWord] = useState("");

  useEffect(() => {
    const newWordBase = { Theme: "" };
    props.langs.map((langg) => (newWordBase[langg.Name] = ""));
    setNewWord(newWordBase);
  }, [props.langs]);

  const handleChange = (index, e) => {
    const upd = newWord;
    upd[index] = e.target.value;
    console.log(upd);
    setNewWord(upd);
  };

  const handleTheme = (e) => {
    const upd = newWord;
    upd.Theme = e.target.value.name;
    setNewWord(upd);
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
    </Grid>
  );
}
