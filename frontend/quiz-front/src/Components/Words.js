import React from "react";
import DisplayWords from "./DisplayWords";
import ModalBase from "./ModalBase";
import NewWord from "./NewWord";

export default function Words(props) {
  return props.allWords.length === 0 ||
    props.langs.length === 0 ||
    props.themes.length === 0 ? (
    <div>Loading..</div>
  ) : (
    <div>
      <ModalBase
        btnTitle="LUO UUSI SANA"
        title="LUO UUSI SANA"
        form={<NewWord langs={props.langs} themes={props.themes} />}
      />
      <DisplayWords langs={props.langs} words={props.allWords}></DisplayWords>
    </div>
  );
}
