import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";
import { postNew } from "../Utils/AxiosUtils";

export default function NewLangThem(props) {
  const [newElement, setNewElement] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const lang = props.isLang ? "kielen" : "teeman";
  const lang2 = props.isLang ? "kieli" : "teema";

  const handleChange = (e) => {
    setNewElement(e.target.value);
  };

  useEffect(
    () => setIsDisabled(newElement === "" ? true : false),
    [newElement]
  );

  const handleClickkeri = async () => {
    const whatToPost = props.isLang ? "lang" : "theme";
    const data = await postNew(newElement, whatToPost);
    console.log(data.status);
    props.fetchAll();
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
