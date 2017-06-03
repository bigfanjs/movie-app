import React from "react";
import {connect} from "react-redux";

import TouchAction from "../../touch-action";

function SearchIcon({onSearch, onTouchStart, onTouchFinish, isTouched}) {
  return (
    <li onClick={onTouchStart.bind(null, "search")}>
      { isTouched &&
        <TouchAction
          onOpen={onSearch.bind(null, "search")}
          onTouchFinish={onTouchFinish}
          />
      }
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30" height="30"
        viewBox="0 0 410.587 410.588">
        <path
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          d={`M410.587,371.351l-50.044-50.044l-39.866-39.866c20.505-28.842,32.685-63.996,32.685-102.009
            c0-97.424-79.263-176.687-176.684-176.687C79.251,2.745,0,82.008,0,179.432c0,97.423,79.251,176.675,176.678,176.675
            c40.698,0,78.116-13.963,108.01-37.167l68.508,68.508c0.841,0.841,1.784,1.509,2.705,2.207l18.194,18.188L410.587,371.351z
            M176.689,314.548c-74.503-0.006-135.111-60.622-135.111-135.111c0-74.5,60.614-135.108,135.111-135.108
            c74.498,0,135.108,60.608,135.108,135.108c0,30.998-10.59,59.507-28.218,82.333c-5.833,7.537-12.374,14.49-19.642,20.654
            C240.374,302.409,209.94,314.548,176.689,314.548z`}
          />
      </svg>
    </li>
  );
}

const mapStateToProps = function ({ touchedIcon }) {
  return { isTouched: touchedIcon === "search" };
};

export default connect(mapStateToProps)(SearchIcon);