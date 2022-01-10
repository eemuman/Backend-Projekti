import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { delByName } from "../Utils/AxiosUtils";

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    const whereToDelete = props.isLang ? "lang" : "theme";
    const deleted = await delByName(whereToDelete, props.toDelete);
    console.log(deleted);
    props.fetchAll();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="error"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        disabled={props.disabled}
      >
        POISTA
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Poistetaanko kieli?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Jos poistat, menetät kaikki kyseisen kielen/teeman tiedot{" "}
            <strong>LOPULLISESTI</strong>!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>PERU</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            POISTA
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
