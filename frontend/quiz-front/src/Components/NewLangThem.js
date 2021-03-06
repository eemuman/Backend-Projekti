import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";
import { postNew } from "../Utils/AxiosUtils";

/**
 * @function
 * @module NewLangThem
 */

/**
 * @function
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
   * @function
   * Jos tekstipoksi ei ole tyhjä, enabloidaan nappi
   */
  useEffect(
    () => setIsDisabled(newElement === "" ? true : false),
    [newElement]
  );

  /**
   * @function
   * Nappia klikattaessa postataan databaseen uusi elementti (joko kieli tai teema)
   */
  const handleClickkeri = async () => {
    const whatToPost = props.isLang ? "langs" : "themes";
    const data = await postNew(newElement, whatToPost);
    props.handleClose();
    await props.fetchAll();
    props.setError(data.status);
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
        style={{ width: 200, height: 60, m: "15px" }}
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
