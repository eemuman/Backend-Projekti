import React from "react";
import LangTheme from "./LangTheme";

/**
 * Hallintapaneelin teemojen pohja.
 * @param {*} props
 * @returns
 */
export default function Themes(props) {
  return (
    <LangTheme
      elemModified="TEEMOJA"
      elem="TEEMA"
      elemSmallMod="Teemat"
      isLang={false}
      {...props}
    />
  );
}
