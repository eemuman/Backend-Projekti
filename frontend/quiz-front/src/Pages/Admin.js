import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Container, Tab, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Words from "../Components/Words";
import Languages from "../Components/Languages";
import Themes from "../Components/Themes";
import { fetchData, checkLogin } from "../Utils/AxiosUtils";
import ErrAlert from "../Components/ErrAlert";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

/**
 * @function
 * @module Admin
 */

/**
 * @function
 * Hallintapaneelin pohjaelementti. Tällä hallitaan mm. datan hakemista, varmistaen että käyttäjä on kirjautuneena sisään, hallitaan uloskirjaus, sekä mikä hallintapaneelin elementti halutaan näyttää
 * @param {*} props
 * @returns Hallintapaneelin pohjaelementti
 */
export default function Admin(props) {
  const [pageVal, setPageVal] = useState("1");
  const [langs, setLangs] = useState([]);
  const [themes, setThemes] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setIsError] = useState("error");
  const [errText, setErrText] = useState("");

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  /**
   * @function
   * Funktio jolla haetaan kaikki tietokantojen sanoihin liittyvä data, (kielet, teemat ja itse sanat).
   * Ensiksi kuitenkin ennen jokaista hakua varmistetaan, että käyttäjä on autentikoitu JWT tokenin validoinilla.
   */
  const fetchAll = async () => {
    const resp = await checkLogin();
    if (resp !== 200) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    }
    if (props.isLoggedIn) {
      const langData = await fetchData("langs");
      setLangs(langData);
      const themeData = await fetchData("themes");
      setThemes(themeData);
      const wordData = await fetchData("words");
      setAllWords(wordData);
    }
  };
  /**
   * Tämän avulla näytetään käyttäjälle josko haluttu tehtävä onnistui (lisäys,poisto,muokkaus)
   * @param {*} status Palvelimelta saatu statusteksti
   */
  const setError = (status) => {
    if (status === 200 || status === 201 || status === 202 || status === 204) {
      setIsError("success");
      setErrText(`Tehtävä suoritettu onnistuneesti!`);
    } else {
      setIsError("error");
      setErrText(`Tapahtui virhe! Yritä uudelleen!`);
    }
    setSuccess(true);
  };

  /**
   * @function
   * Kun hallintasivulle tullaan, haetaan ensiksi kaikki datat.
   */
  useEffect(() => {
    fetchAll();
  }, []);

  /**
   * @function
   * Vaihdetaan eri hallintapaneelin elementtien avulla tätä hyväksikäyttäen
   * @param {*} e
   * @param {*} val Mikä sivu on valittu
   */
  const handleChange = (e, val) => {
    setPageVal(val);
  };

  /**
   * @function
   * Uloskirjautumisnäppäintä painettaessa kutsutaan tätä, eli ensiksi poistetaan kekseistä JWT tokeni ja sen jälkeen poistetaan loggedIn flagi fetchAll funktiota käyttäen.
   */
  const logOut = async () => {
    localStorage.removeItem("user");
    await fetchAll();
  };

  /**
   * @function
   * Propsit mitkä lähetetään kaikille elementeille.
   */
  const propsit = {
    langs: langs,
    themes: themes,
    allWords: allWords,
    fetchAll: fetchAll,
    setError: setError,
  };

  return (
    <React.Fragment>
      <ErrAlert
        text={errText}
        isFalse={isSuccess}
        setFalse={setSuccess}
        isErr={isError}
      />
      <CssBaseline />

      <Container fluid>
        <Button onClick={logOut} sx={{ m: { sm: "5px", md: "20px" } }}>
          KIRJAUDU ULOS
        </Button>
        <Box
          sx={{
            border: 1,
            borderRadius: 3,
            borderColor: "grey.400",
            flexGrow: 1,
            p: "25px 15px 60px 16px",
            bgcolor: "grey.50",
            boxShadow: 3,
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography
              sx={{
                fontWeight: "bold",
                borderBottom: 1,
                borderColor: "grey.400",
                padding: "5px",
                mt: "15px",
              }}
              variant="h3"
              gutterBottom
              component="div"
            >
              HALLINTAPANEELI
            </Typography>
          </ThemeProvider>
          <TabContext value={pageVal}>
            <TabList value={pageVal} onChange={handleChange} centered>
              <Tab value="1" label="SANAT" />
              <Tab value="2" label="KIELET" />
              <Tab value="3" label="TEEMAT" />
            </TabList>
            <TabPanel value="1">
              <Words {...propsit} />
            </TabPanel>
            <TabPanel value="2">
              <Languages {...propsit} />
            </TabPanel>
            <TabPanel value="3">
              <Themes {...propsit} />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </React.Fragment>
  );
}
