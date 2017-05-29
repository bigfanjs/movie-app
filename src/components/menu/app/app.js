import React from "react";
import {connect} from "react-redux";

import MoviesIcon from "../movies-icon";
import ShowsIcon from "../shows-icon";
import FilterIcon from "../filter-icon";

import {setLocation, showFilter} from "./action";

import {menu, hide, show} from "./app.scss";

function Menu({className, onSelect, openFilter}) {
  return (
    <ul className={menu + " " + className}>
      <li>
        <h1>Movie App</h1>
      </li>
      <MoviesIcon onSelect={onSelect} />
      <ShowsIcon onSelect={onSelect} />
      <FilterIcon openFilter={openFilter} />
    </ul>
  );
}

const
  mapStateToProps = function ({visiblePanel}) {
    return {
      className: visiblePanel === "menu" ? show : hide
    };
  },
  mapDispatchToProps = function (dispatch) {
    return {
      select: function (location) {
        dispatch(setLocation(location));
      },
      openFilter: function () {
        dispatch(showFilter);
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);