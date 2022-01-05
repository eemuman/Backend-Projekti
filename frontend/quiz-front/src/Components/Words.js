import React from "react";
import ModalBase from "./ModalBase";
import NewWord from "./NewWord";

export default function Words(props) {
  console.log("COMING HERE! W");
  return (
    <div>
      <ModalBase
        btnTitle="LUO UUSI SANA"
        title="LUO UUSI SANA"
        form={<NewWord langs={props.langs} themes={props.themes} />}
      />
    </div>
  );
}
