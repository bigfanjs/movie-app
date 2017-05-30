import React from "react";

import ArrowIcon from "../arrow-icon";
import FormInput from "../form-input";

import styles from "./app.scss";

export default function () {
  return (
    <ul className={styles.searchInput}>
      <ArrowIcon />
      <FormInput />
    </ul>
  );
}