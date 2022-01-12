import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

/**
 * Funktio joka antaa visuaalista palautetta siitä, kuinka monta meni oikein
 * @param {*} props
 * @returns Elementin joka kertoo kuinka monta meni oikein
 */
export default function CorAmountShower(props) {
  const [text, setText] = useState("");
  const [fontColor, setFontColor] = useState("black");
  const amountDivided = props.corAmount / props.totalAmount;

  /**
   * Vaihdetaan teksti ja sen väri sen mukaan kuinka monta meni oikein jaettuna kokonaismäärällä.
   */
  useEffect(() => {
    if (amountDivided <= 0.25) {
      setText(`Yritäppä uudelleen!`);
      setFontColor("#DF0101");
    } else if (amountDivided > 0.25 && amountDivided <= 0.5) {
      setText(`Hyvä yritys!`);
      setFontColor("#DF7401");
    } else if (amountDivided > 0.5 && amountDivided <= 0.75) {
      setText(`Aika lähellä jo!`);
      setFontColor("#DBA901");
    } else if (amountDivided > 0.75 && amountDivided < 1) {
      setText(`Todella hyvin tehty!`);
      setFontColor("#A5DF00");
    } else {
      setText(`MAHTAVAA!`);
      setFontColor("#3ADF00");
    }
    setText((curText) => curText.concat());
  }, [amountDivided, props.corAmount, props.totalAmount]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography
          sx={{
            fontWeight: "bold",
            WebkitTextStroke: "1px black",
          }}
          color={fontColor}
          variant="h3"
          component="div"
        >
          {text}
        </Typography>
        <Typography
          color={fontColor}
          sx={{
            fontWeight: "bold",
            WebkitTextStroke: "1px black",
          }}
          variant="h4"
          component="div"
        >
          {`Oikein meni: ${props.corAmount} / ${props.totalAmount}`}
        </Typography>
      </ThemeProvider>
    </div>
  );
}
