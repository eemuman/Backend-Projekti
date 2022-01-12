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
import CorAmountShower from "./CorAmountShower";

/**
 * @function
 * @module Play
 */

/**
 * @function
 * Tämä on pelaamissivun pohjaelementti. Tämä hallitsee mm. Sanojen näyttämisen, textfieldien datan tallentamisen sekä oikeiden vastausten tarkistamisen.
 * @param {*} props
 * @returns Pelaamisen pohjaelementti
 */
export default function Play(props) {
  const [isVis, setisVis] = useState("none");
  const [corAmount, setCorAmount] = useState(0);
  const style = { display: isVis, marginTop: "0.75em" };

  /**
   * @function
   * Tämä funktio tarkistaa arrayn lävitse ja vertaa onko kirjoitettu sana sama kuin halutun kielen vastaava sana.
   * Tämä tehdään mappamalla ja jos vastaus on oikein laitetaan siittä answArrayn correct flagiin true ja vastaavasti väärän kohdalla false.
   * Samalla laitetaan haluttu iconi näkymään textfieldin viereen.
   */
  const checkAnsw = () => {
    var totalCorrect = 0;
    props.answArray.map((ans, index) => {
      const upd = [...props.answArray];
      upd[index].correct =
        ans.data.toLowerCase() ===
        props.words[index][props.secondaryLang].toLowerCase()
          ? true
          : false;
      if (upd[index].correct) totalCorrect += 1;
      upd[index].disabled = true;
      setisVis("inline-block");
      props.setAnswArray(upd);
      return ans;
    });

    setCorAmount(totalCorrect);
  };

  /**
   * @function
   * Kun johnkin textfieldiin kirjoitetaan, päivitetään sen indeksin kohdalla oleva answArray.data.
   * @param {*} index halutun textfieldin index
   * @param {*} e data mitä halutaan.
   */
  const handleData = (index, e) => {
    const upd = [...props.answArray];
    upd[index].data = e.target.value;
    props.setAnswArray(upd);
  };

  /**
   * @function
   * Painettaessa palaa takaisin, kutsutaan tätä. kun isPlaying on false, näkyy käyttäjälle settings sivu ja toistepäin.
   */
  const handleBack = () => {
    props.setIsPlaying();
  };

  /**
   * @function
   * Kun on tarkistettu vastaukset, nappi vaihtuu nappiin, jolla voidaan hakea uudet sanat databasesta. TS. pelata uudestaan, se hoidetaan tämän funktion avulla.
   * Samalla piiloitetaan iconit
   */
  const playAgain = () => {
    props.fetchData();
    setisVis("none");
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
            p: "50px",
            pt: "-25px",
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
                            value={props.answArray[index].data}
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
              textAlign="center"
              sx={{ display: isVis }}
              alignItems="center"
            >
              <CorAmountShower
                corAmount={corAmount}
                totalAmount={props.answArray.length}
              />
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

              {isVis === "none" ? (
                <Button
                  style={{ width: 200, height: 60 }}
                  variant="contained"
                  color="success"
                  onClick={checkAnsw}
                  endIcon={<SendIcon />}
                >
                  TARKISTA VASTAUKSET
                </Button>
              ) : (
                <Button
                  style={{ width: 200, height: 60 }}
                  variant="contained"
                  color="success"
                  onClick={playAgain}
                  endIcon={<SendIcon />}
                >
                  PELAA UUDESTAAN
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}
