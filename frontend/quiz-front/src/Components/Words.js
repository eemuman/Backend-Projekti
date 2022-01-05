import React from "react";
import ModalBase from "./ModalBase";
import NewWord from "./NewWord";

export default function Words() {
  console.log("COMING HERE! W");
  return (
    <div>
      <ModalBase btnTitle="Luo Sana" title="Luo uusi Sana" form={<NewWord />} />
    </div>
  );
}
