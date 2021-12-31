import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function LangMenu(props) {
  return (
    <div>
      <div>{props.label}</div>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id={props.label}>{props.label}</InputLabel>
        <Select
          labelId={props.labelId}
          id={props.id}
          defaultValue=""
          label={props.label}
          onChange={props.handle}
        >
          {" "}
          {props.langs.map((lang, index) => {
            if (lang.Name !== props.secondLang.Name) {
              return (
                <MenuItem key={index} value={lang}>
                  {lang.Name}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem disabled key={index} value={lang}>
                  {lang.Name}
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
