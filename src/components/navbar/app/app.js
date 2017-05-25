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

    return (
      <ul className={classNames.navbar}>
        <MenuIcon onOpen={handleShow} />
        <span>
          <h2>Movies</h2>
        </span>
        <MoreIcon onMore={handleShow} />
        <SearchIcon onSearch={handleShow} />
      </ul>
    );
  }
);