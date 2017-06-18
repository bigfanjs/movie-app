import React from "react";
import {connect} from "react-redux";

import styles from "./shadow.scss";

function Shadow({className, percentage}) {
  const style = {
    opacity: percentage
  };

  return <div className={className} style={style} />;
}

const mapStateToProps = function ({visiblePanel, touchedIcon, percentage}) {
  const {shadow, darken, lighten, block} = styles;

  const
    class1 = `${ visiblePanel ? darken : visiblePanel == false ? lighten : "" }`,
    class2 = `${ touchedIcon && touchedIcon.length ? block : ""}`;

  return {
    className: `${shadow} ${class1} ${class2}`,
    percentage: Math.min(0.7, 1 - Math.abs(percentage / 100))
  };
};

export default connect(mapStateToProps)(Shadow);