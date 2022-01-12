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
import { postWord, updateWordById } from "../Utils/AxiosUtils";
import RemoveWordAlert from "./RemoveWordAlert";

/**
 * Uuden sanan luomispohja käytettäväksi modalbasessa. Sama elementti käytössä myös kun muokataan vanhaa sanaa.
 * @param {*} props
 * @returns Uuuden sanan pohjaelementti
 */
export default function NewWord(props) {
  const [newWord, setNewWord] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const isEdit = props.isEdit;

  /**
   * Jos muokataan sanaa, otetaan vanhat datat newWord-stateen.
   * Muuaten luodaan vain uusi tyhjä olio käyttäen kieliarraytä hyväkseen.
   */
  useEffect(() => {
    if (isEdit) setNewWord({ ...props.editWord });
    else {
      const newWordBase = { theme_id: "" };
      props.langs.map((langg) => (newWordBase[langg.name] = ""));
      setNewWord(newWordBase);
    }
  }, [props.langs, props.editWord, isEdit]);

  /**
   * Kun suljetaan modali, päivitetään kaikki datat, jotta sivulla oleva tieto on tuoretta.
   */
  const handleData = async () => {
    await props.fetchAll();
    props.handleClose();
  };

  /**
   * Tällä funktiolla muokataan newWord-staten oliota halutulta kohdalta, jotta kirjoitettu data pidetään yllä.
   * @param {*} index Halutun muokkauksen tekstin indexi
   * @param {*} e eventti
   */
  const handleChange = (index, e) => {
    const upd = newWord;
    upd[index] = e.target.value;
    setNewWord(upd);
    checkDisabled();
  };
  /**
   * Tällä händlätään newWord-staten teeman valinta, kun käyttäjä valitsee eri teeman valikoista.
   * @param {*} e
   */
  const handleTheme = (e) => {
    const upd = newWord;
    upd.theme_id = e.target.value;
    setNewWord(upd);
    checkDisabled();
  };

  /**
   * Tätä kutsutaan kun painetaan tallena näppäintä. isEdit booleania hyväksikäyttäen valitaan joko luodaan uusi vai muokataanko vanhaa tietokannan elementtiä. Sen jälkeen kutsutaan handleDataa.
   */
  const handleClickkeri = async () => {
    const data = isEdit
      ? await updateWordById(newWord)
      : await postWord(newWord);
    console.log(data);
    await handleData();
  };

  /**
   * Jos Suomenkielisessä käännöksessä on tekstiä, sekä on valittu joka teema, enabloidaan tallennanäppäin.
   */
  const checkDisabled = () => {
    if (newWord.Suomi !== "" && newWord.theme_id !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return Object.keys(newWord).length === 0 ? (
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
            label={test.name}
            defaultValue={newWord[test.name]}
            variant="outlined"
            helperText={`Lisää sanan käännös kielelle ${test.name}`}
            onChange={(e) => handleChange(test.name, e)}
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
            <RemoveWordAlert id={newWord.id} handleClose={handleData} />
          </FormControl>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}
