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

export default function Admin(props) {
  const [pageVal, setPageVal] = useState("1");
  const [langs, setLangs] = useState([]);
  const [themes, setThemes] = useState([]);
  const [allWords, setAllWords] = useState([]);

  async function fetchAll() {
    const resp = await checkLogin();
    if (resp !== 200) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    }
    if (props.isLoggedIn) {
      const langData = await fetchData("lang");
      setLangs(langData);
      const themeData = await fetchData("theme");
      setThemes(themeData);
      const wordData = await fetchData("word");
      setAllWords(wordData);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e, val) => {
    setPageVal(val);
  };

  const logOut = async () => {
    localStorage.removeItem("user");
    await fetchAll();
  };

  const propsit = {
    langs: langs,
    themes: themes,
    allWords: allWords,
    fetchAll: fetchAll,
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
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
            <Button onClick={logOut}>KIRJAUDU ULOS</Button>
          </Typography>
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
