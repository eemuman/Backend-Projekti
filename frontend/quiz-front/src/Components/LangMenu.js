import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function LangMenu(props) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={props.label}>{props.label}</InputLabel>

        <Select
          labelId={props.labelId}
          id={props.id}
          value={props.curLang}
          label={props.label}
          onChange={props.handle}
          autoWidth
        >
          {" "}
          {props.langs.map((lang, index) => {
            if (lang !== props.secondLang) {
              return (
                <MenuItem key={index} value={lang}>
                  {lang}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem disabled key={index} value={lang}>
                  {lang}
                </MenuItem>
              );
            }
          })}
        </Select>
        <FormHelperText>{props.helperTxt}</FormHelperText>
      </FormControl>
    </div>
  );
}
