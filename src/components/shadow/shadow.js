import React from "react";
import {connect} from "react-redux";

import styles from "./shadow.scss";

function Shadow({className, percentage, opacity, isHeld}) {
  const style = {
    opacity: isHeld ? percentage : opacity,
    transition: !isHeld ? "opacity 100ms ease-in-out" : "none"
  };

  return <div className={className} style={style} />;
}

const mapStateToProps = function ({visiblePanel, touchedIcon, percentage, touch}) {
  const {shadow, block} = styles;

  return {
    className: `${shadow} ${touchedIcon && touchedIcon.length ? block : ""}`,
    percentage: Math.min(0.7, 1 - Math.abs(percentage / 100)),
    opacity: visiblePanel ? 0.7 : 0,
    isHeld: touch
  };
};

export default connect(mapStateToProps)(Shadow);