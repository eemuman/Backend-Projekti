import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";

export default function NewLangThem(props) {
  const [newElement, setNewElement] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    setNewElement(e.target.value);
  };

  useEffect(
    () => setIsDisabled(newElement === "" ? true : false),
    [newElement]
  );

  const handleClickkeri = () => {
    //TODO PUSKE UUTTA DATAA BEISSII
  };

  return (
    <div>
      <TextField
        fullWidth
        autoComplete="off"
        id="NEWNAME"
        margin="normal"
        label="Uusi kieli"
        defaultValue=""
        variant="outlined"
        helperText={`Anna uuden kielen nimi`}
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
