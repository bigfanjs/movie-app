import React from "react";
import {connect} from "react-redux";

import TouchAction from "../../touch-action";

function MenuIcon({onOpen, onTouchStart, onTouchFinish, isTouched}) {
  return (
    <li onClick={onTouchStart.bind(null, "menu")}>
      { isTouched &&
        <TouchAction
          onOpen={onOpen.bind(null, "menu")}
          onTouchFinish={onTouchFinish}
          />
      }
      <svg width="30" height="23">
        <rect x="0" y="0" width="30" height="3" fill="#fff" />
        <rect x="0" y="10" width="30" height="3" fill="#fff" />
        <rect x="0" y="20" width="30" height="3" fill="#fff" />
      </svg>
    </li>
  );
}

const mapStateToProps = function ({ touchedIcon }) {
  return { isTouched: touchedIcon === "menu" };
};

export default connect(mapStateToProps)(MenuIcon);