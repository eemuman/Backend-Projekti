import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

export default function Play(props) {
  const testData1 = ["TEST", "TEST", "TEST", "TEST", "TEST"];
  const testData2 = ["TEST", "TEST", "TEST", "TEST", "TEST"];
  const answers = [];

  const handleBack = () => {
    props.setIsPlaying(false);
  };

  return (
    <div>
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
          KÄÄNNÄ SANAT
        </Typography>
        <Grid container rowGap={3}>
          <Grid container justifyContent="space-around" alignItems="center">
            <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
              <Table aria-label="simple table" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">{props.primaryLang}</TableCell>

                    <TableCell align="center">{props.secondaryLang}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testData1.map((test, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{test}</TableCell>

                      <TableCell align="center">
                        <TextField
                          id={index.toString()}
                          label="Vastaus tähän"
                          variant="standard"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            container
            justifyContent="space-evenly"
            alignItems="center"
            marginBottom={2}
          >
            <Button size="large" variant="contained" onClick={handleBack}>
              PALAA TAKAISIN
            </Button>

            <Button
              style={{ width: 200, height: 60 }}
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
            >
              TARKISTA VASTAUKSET
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
