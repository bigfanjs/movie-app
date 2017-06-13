import React from "react";
import {connect} from "react-redux";

import styles from "./shadow.scss";

function Shadow({ className }) {
  return <div className={className} />;
}

const mapStateToProps = function ({visiblePanel, touchedIcon}) {
  const {shadow, darken, lighten, block} = styles;

  const class1 = `${ visiblePanel ? darken : visiblePanel == false ? lighten : "" }`;
  const class2 = `${ touchedIcon && touchedIcon.length ? block : ""}`;

  return {
    className: `${shadow} ${class1} ${class2}`
  };
};

export default connect(mapStateToProps)(Shadow);