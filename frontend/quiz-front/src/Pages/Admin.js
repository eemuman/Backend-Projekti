import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Container, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Words from "../Components/Words";
import Languages from "../Components/Languages";
import Themes from "../Components/Themes";

export default function Admin() {
  const [pageVal, setPageVal] = useState("1");

  const handleChange = (e, val) => {
    setPageVal(val);
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
          </Typography>
          <TabContext value={pageVal}>
            <TabList value={pageVal} onChange={handleChange} centered>
              <Tab value="1" label="SANAT" />
              <Tab value="2" label="KIELET" />
              <Tab value="3" label="TEEMAT" />
            </TabList>
            <TabPanel value="1">
              <Words />
            </TabPanel>
            <TabPanel value="2">
              <Languages />
            </TabPanel>
            <TabPanel value="3">
              <Themes />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </React.Fragment>
  );
}
