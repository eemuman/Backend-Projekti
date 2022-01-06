import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import { postWord } from "../Utils/AxiosUtils";

export default function NewWord(props) {
  const [newWord, setNewWord] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const isEdit = props.isEdit;

  useEffect(() => {
    if (isEdit) setNewWord({ ...props.editWord });
    else {
      const newWordBase = { theme_id: "" };
      props.langs.map((langg) => (newWordBase[langg.Name] = ""));
      setNewWord(newWordBase);
    }
  }, [props.langs, props.editWord, isEdit]);

  const handleChange = (index, e) => {
    const upd = newWord;
    upd[index] = e.target.value;
    setNewWord(upd);
    checkDisabled();
  };

  const handleTheme = (e) => {
    const upd = newWord;
    upd.theme_id = e.target.value;
    console.log(upd);
    setNewWord(upd);
    checkDisabled();
  };

  const handleClickkeri = () => {
    postWord(newWord);
  };

  const checkDisabled = () => {
    if (newWord.Suomi !== "" && newWord.theme_id !== "") {
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
            defaultValue={newWord[test.Name]}
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
            key={newWord.theme_id}
            labelId="Theme"
            id="Themes"
            defaultValue={newWord.theme_id}
            label="teema"
            onChange={handleTheme}
          >
            {props.themes.map((theme, index) => (
              <MenuItem key={index} value={theme.name}>
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
            TALLENNA
          </Button>
        </FormControl>
      </Grid>
      {isEdit ? (
        <Grid item>
          {" "}
          <FormControl sx={{ m: 1 }}>
            <Button
              style={{ width: 200, height: 60 }}
              variant="contained"
              color="error"
              onClick={handleClickkeri}
              endIcon={<DeleteForeverIcon />}
            >
              POISTA
            </Button>
          </FormControl>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}
