import React from "react";
import {connect} from "react-redux";

import TouchAction from "../../touch-action";

function MoreIcon({onMore, onTouchStart, onTouchFinish, isTouched}) {
  return (
    <li onClick={onTouchStart.bind(null, "more")}>
      { isTouched &&
        <TouchAction
          onOpen={onMore.bind(null, "more")}
          onTouchFinish={onTouchFinish}
          />
      }
      <svg width="6" height="26">
        <circle cx="3" cy="3" r="3" fill="#fff" />
        <circle cx="3" cy="13" r="3" fill="#fff" />
        <circle cx="3" cy="23" r="3" fill="#fff" />
      </svg>
    </li>
  );
}

const mapStateToProps = function ({ touchedIcon }) {
  return { isTouched: touchedIcon === "more" };
};

export default connect(mapStateToProps)(MoreIcon);