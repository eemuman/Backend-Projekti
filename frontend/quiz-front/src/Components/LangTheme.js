import React, { useState, useEffect } from "react";
import ModalBase from "./ModalBase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";
import RemoveAlert from "./RemoveAlert";
import NewLangThem from "./NewLangThem";

/**
 * Hallintapaneelin kielten/teemojen hallinan pohjaelementti. Sisältää napit joilla lisätä uusia ja select-menu josta valita kielet sekä poisto-nappi niiden poistoon. Muokataan kumpaankin (kieli/teema) sopivaksi propseja käyttämällä.
 * @param {*} props Tarvittava data, jotta saadaan muokattua halutun näköiseksi
 * @returns
 */
export default function LangTheme(props) {
  const [curEle, setCurLang] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (e) => {
    setCurLang(e.target.value);
  };

  useEffect(() => setIsDisabled(curEle === "" ? true : false), [curEle]);

  return (
    <>
      <Typography
        sx={{
          borderBottom: 1,
          borderColor: "grey.400",
          padding: "5px",
        }}
        variant="button"
        fontSize={"1em"}
        gutterBottom
        component="div"
      >
        {`LUO JA POISTA ${props.elemModified}`}
      </Typography>
      <Grid
        marginTop={"25px"}
        marginBottom={"100px"}
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <ModalBase
            btnTitle={`LUO UUSI ${props.elem}`}
            title={`LUO UUSI ${props.elem}`}
            isIcon={false}
            form={
              <NewLangThem isLang={props.isLang} fetchAll={props.fetchAll} />
            }
          ></ModalBase>
        </Grid>

        <Grid item>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="demo-simple-select-standard-label">
              {props.elemSmallMod}
            </InputLabel>
            <Select
              placeholder="Valitse kieli jonka haluat poistaa..."
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={curEle}
              onChange={handleChange}
              label="Kielet"
            >
              {props.isLang
                ? props.langs.map((lang) => {
                    if (lang.name !== "Suomi")
                      return (
                        <MenuItem key={lang.name} value={lang.name}>
                          {lang.name}
                        </MenuItem>
                      );
                    return null;
                  })
                : props.themes.map((theme) => (
                    <MenuItem key={theme.name} value={theme.name}>
                      {theme.name}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <RemoveAlert
            disabled={isDisabled}
            isLang={props.isLang}
            toDelete={curEle}
            fetchAll={props.fetchAll}
          />
        </Grid>
      </Grid>
    </>
  );
}
