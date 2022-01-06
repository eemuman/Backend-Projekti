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
import LangTheme from "./LangTheme";

export default function Languages(props) {
  return (
    <LangTheme
      elemModified="KIELIÄ"
      elem="KIELI"
      elemSmallMod="Kielet"
      isLang={true}
      {...props}
    />
  );
}
