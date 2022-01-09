import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  textAlign: "center",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isIcon = props.isIcon;

  return (
    <div>
      {isIcon ? (
        <IconButton onClick={handleOpen} size="large">
          {props.variant}
        </IconButton>
      ) : (
        <Button onClick={handleOpen} variant="outlined" size="large">
          {props.btnTitle}
        </Button>
      )}

      <Modal
        sx={{ maxWidth: "100%" }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              <strong>{props.title}</strong>
            </Typography>
            {React.cloneElement(props.form, { handleClose: handleClose })}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
