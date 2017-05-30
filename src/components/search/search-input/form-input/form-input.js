import React from "react";

import styles from "./form-input.scss";

export default function () {
  return (
    <input
      className={styles.formInput}
      type="text"
      placeholder="Movie title..."
      />
  );
}