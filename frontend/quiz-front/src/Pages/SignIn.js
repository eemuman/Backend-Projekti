import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { checkLogin, logUserIn } from "../Utils/AxiosUtils";
import { useNavigate } from "react-router-dom";

/**
 * @function
 * @module SignIn
 */

/**
 * @function
 *
 * Kirjautumiseen käytettävä sivu, sisältää login-paneelin.
 * @param {*} props
 * @returns sign-in elementti
 */
export default function SignIn(props) {
  const navigate = useNavigate();

  /**
   * @function
   *
   * Jos storagessa on jo validi JWT tokeni, siirrytään suoraan hallintapaneelisivustolle.
   */
  useEffect(() => {
    if (props.isLoggedIn) navigate(`/Admin`);
  }, [props.isLoggedIn, navigate]);

  /**
   * @function
   *
   * Tällä funktiolla tarkistetaan onko käyttäjällä validi JWT tokeni, jos on, muutetaan setLoggedIn trueksi ja tämän jälkeen useEffect siirtää käyttäjän hallintapaneeliin.
   */
  const checkifLogged = async () => {
    const resp = await checkLogin();
    if (resp === 200) props.setLoggedIn(true);
  };

  /**
   * @function
   *
   * Kun käyttäjä antaa käyttäjänimen sekä salasanan, verrataan niitä tietokannan tietoihin, jos ne mätsää, annetaan käyttäjälle JWT tokeni. Sitten tarkistetaan onko käyttäjällä validia JWT tokenia checkIfLoggedia käyttäen.
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await logUserIn(data.get("username"), data.get("password"));
    await checkifLogged();
  };
  /**
   * @function
   *
   * Jos taas vain painetaan playta, Main.js elementtiin.
   */
  const goPlay = () => {
    navigate(`/Play`);
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            p: "50px",
            textAlign: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            KIRJAUDU SISÄÄN
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Käyttäjänimi"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Salasana"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            color="success"
            variant="contained"
            size="large"
            sx={{ mt: 1, mb: 3, pl: 3, pr: 3, height: 50 }}
            onClick={goPlay}
          >
            SIIRRY PELAAMAAN
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
