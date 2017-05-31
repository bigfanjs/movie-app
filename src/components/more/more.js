import React from "react";

import styles from "./more.scss";

export default function () {
  return (
    <ul className={styles.more}>
      <li>
        <a href="#">About</a>
      </li>
      <li>
        <a href="#">Help/FAQ</a>
      </li>
      <li>
        <a href="#">Support us</a>
      </li>
      <li>
        <a href="#">Contact us</a>
      </li>
    </ul>
  );
}