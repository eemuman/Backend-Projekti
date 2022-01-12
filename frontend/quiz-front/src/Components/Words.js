import React from "react";
import DisplayWords from "./DisplayWords";

/**
 * Hallintapaneelin sanahallinan pohja.
 * @param {*} props
 * @returns Sanojen hallinan pohjaelementti
 */
export default function Words(props) {
  return props.allWords.length === 0 ||
    props.langs.length === 0 ||
    props.themes.length === 0 ? (
    <div>Loading..</div>
  ) : (
    <div>
      <DisplayWords {...props}></DisplayWords>
    </div>
  );
}
