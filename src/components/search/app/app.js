import React from "react";

import SearchInput from "../search-input";
import SearchResult from "../search-result";

import styles from "./app.scss";

export default function () {
  return (
    <ul className={styles.search}>
      <SearchInput />
      <SearchResult />
    </ul>
  );
}