import React from "react";
import {connect} from "react-redux";

import styles from "./shadow.scss";

function Shadow({ className }) {
  return <div className={className} />;
}

const mapStateToProps = function ({visiblePanel}) {
  const {shadow, darken, lighten} = styles;

  return {
    className: `${shadow} ${visiblePanel != false && visiblePanel != null ? darken : lighten}`
  };
}

export default connect(mapStateToProps)(Shadow);