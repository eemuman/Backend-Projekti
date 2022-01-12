import React from "react";

import LangTheme from "./LangTheme";

/**
 * Pohjaelementti hallintapaneelin kieltenvalinnalle
 * @param {*} props
 * @returns Kielten pohjaelementti
 */
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
