import React from "react";

import styles from "./search-result.scss";

export default function () {
  return (
    <li className={styles.searchResult}>
      <ul>
        <li>Result 1</li>
        <li>Result 2</li>
        <li>Result 3</li>
      </ul>
    </li>
  );
}