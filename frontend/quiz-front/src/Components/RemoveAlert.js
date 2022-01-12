import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { delByName } from "../Utils/AxiosUtils";

/**
@FUNCTION
 * @module RemoveAlert
 */

/**
@FUNCTION
 *
 * Tämä on hallintapaneelin teema/kieli-valintojen poistonappi. Kun nappia painetaan aukeaa tämä alert.
 * @param {*} props
 * @returns Poistahäly-elementti
 */
export default function RemoveAlert(props) {
  const [open, setOpen] = useState(false);

  /**
@FUNCTION
   *
   * Nappia painettu, avataan alert.
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
@FUNCTION
   *
   * Jos käyttäjä painaa poista näppäintä alertissa, niin poistetaan kyseinen kieli/teema databasesta. props.isLang päättää onko kyseessä kieli vai teema.
   * Sen jälkeen ladataan datat uudestaan ja suljetaan alert.
   */
  const handleDelete = async () => {
    const whereToDelete = props.isLang ? "langs" : "themes";
    const deleted = await delByName(whereToDelete, props.toDelete);
    await props.fetchAll();
    handleClose();
    props.setError(deleted.status);
  };

  /**
@FUNCTION
   *
   * tällä suljetaan alert.
   */
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
