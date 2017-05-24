import React from "react";
import {connect} from "react-redux";

import {openPanel, closePanel} from "./action";

import MenuIcon from "../menu-icon";
import MoreIcon from "../more-icon";
import SearchIcon from "../search-icon";

import classNames from "./app.scss";

export default connect()(
  function ({location, dispatch}) {
    const
      handleShow = function (panel) {
        dispatch(openPanel(panel));
      },
      handleClose = function () {
        dispatch(closePanel());
      };

    return (
      <ul className={classNames.navbar}>
        <MenuIcon onOpen={handleShow} onClose={handleClose} />
        <span>
          <p>{ location }</p>
        </span>
        <MoreIcon onMore={handleShow} onClose={handleClose} />
        <SearchIcon onSearch={handleShow} onClose={handleClose} />
      </ul>
    );
  }
);