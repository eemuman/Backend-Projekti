import React, { useState } from "react";
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
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export default function Play(props) {
  const [isVis, setisVis] = useState("none");

  const style = { display: isVis, marginTop: "0.75em" };

  const checkAnsw = () => {
    props.answArray.map((ans, index) => {
      const upd = [...props.answArray];
      upd[index].correct =
        ans.data.toLowerCase() ===
        props.words[index][props.secondaryLang].toLowerCase()
          ? true
          : false;

      upd[index].disabled = true;
      setisVis("inline-block");
      props.setAnswArray(upd);
      return ans;
    });
  };

  const handleData = (index, e) => {
    const upd = [...props.answArray];
    upd[index].data = e.target.value;
    props.setAnswArray(upd);
  };

  const handleBack = () => {
    props.setIsPlaying();
  };

  if (props.answArray.length === 0) {
    return <div>LOADING</div>;
  } else {
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
            <Grid
              container
              justifyContent="space-evenly"
              alignItems="center"
              text-align="center"
            >
              <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                <Table aria-label="simple table" sx={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <strong>{props.primaryLang}</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong> {props.secondaryLang}</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.words.map((test, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          <strong>{test[props.primaryLang]}</strong>
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            id={index.toString()}
                            label="Vastaus tähän"
                            variant="standard"
                            disabled={props.answArray[index].disabled}
                            onChange={(e) => handleData(index, e)}
                          />
                          {props.answArray[index].correct ? (
                            <CheckOutlinedIcon color="success" sx={style} />
                          ) : (
                            <ClearOutlinedIcon color="error" sx={style} />
                          )}
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
                onClick={checkAnsw}
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
}
