import React from "react";

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
