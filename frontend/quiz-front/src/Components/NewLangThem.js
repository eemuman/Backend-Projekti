import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";
import { postNew } from "../Utils/AxiosUtils";

/**
 * Uuden kielen/Teeman formi, käytetään ModalBasessa.
 * @param {*} props
 * @returns Uuden kieli/teeman formi
 */
export default function NewLangThem(props) {
  const [newElement, setNewElement] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const lang = props.isLang ? "kielen" : "teeman";
  const lang2 = props.isLang ? "kieli" : "teema";

  const handleChange = (e) => {
    setNewElement(e.target.value);
  };

  /**
   * Jos tekstipoksi ei ole tyhjä, enabloidaan nappi
   */
  useEffect(
    () => setIsDisabled(newElement === "" ? true : false),
    [newElement]
  );

  /**
   * Nappia klikattaessa postataan databaseen uusi elementti (joko kieli tai teema)
   */
  const handleClickkeri = async () => {
    const whatToPost = props.isLang ? "lang" : "theme";
    const data = await postNew(newElement, whatToPost);
    console.log(data.status);
    await props.fetchAll();
    props.handleClose();
  };

  return (
    <div>
      <TextField
        fullWidth
        autoComplete="off"
        id="NEWNAME"
        margin="normal"
        label={`Uusi ${lang2}`}
        defaultValue=""
        variant="outlined"
        helperText={`Anna uuden ${lang} nimi`}
        onChange={(e) => handleChange(e)}
      />
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
    </div>
  );
}
