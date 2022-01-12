import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

export default function ErrAlert(props) {
  const handleClose = (event, reason) => {
    props.setFalse(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={Slide}
      open={props.isFalse}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.isErr} variant="filled">
        {props.text}
      </Alert>
    </Snackbar>
  );
}
