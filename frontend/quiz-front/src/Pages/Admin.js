import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  Grid,
  Typography,
  Box,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  SendIcon,
  Alert,
  Snackbar,
  Slide,
} from "@mui/material";

export default function Admin() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          border: 1,
          borderRadius: 3,
          borderColor: "grey.400",
          flexGrow: 1,
          marginTop: "25px",
          bgcolor: "grey.50",
          boxShadow: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            borderBottom: 1,
            borderColor: "grey.400",
            padding: "5px",
          }}
          variant="h3"
          gutterBottom
          component="div"
        >
          HALLINTAPANEELI
        </Typography>
      </Box>
    </React.Fragment>
  );
}
