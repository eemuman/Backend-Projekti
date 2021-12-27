import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function LangMenu(props) {
  return (
    <div>
      <Select
        labelId={props.labelId}
        id={props.id}
        value={props.curLang}
        label={props.label}
        onChange={props.handle}
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
    </div>
  );
}
