import React from "react";
import {connect} from "react-redux";

import openPanel from "./action";

import MenuIcon from "../menu-icon";
import MoreIcon from "../more-icon";
import SearchIcon from "../search-icon";

import classNames from "./app.scss";

export default connect()(
  function ({location, dispatch}) {
    const handleShow = function (panel) {
      dispatch(openPanel(panel));
    };

    const {_navbar, _location} = classNames;

    return (
      <ul className={_navbar}>
        <MenuIcon onOpen={handleShow} />
        <li className={_location}>
          <h1>Movies</h1>
        </li>
        <SearchIcon onSearch={handleShow} />
        <MoreIcon onMore={handleShow} />
      </ul>
    );
  }
);