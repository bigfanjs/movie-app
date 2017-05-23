import React from "react";
import {connect} from "redux";

import {openPanel, closePanel} from "./action";

import MenuIcon from "../menu-icon";
import MoreIcon from "../more-icon";
import SearchIcon from "../search-icon";

import "./app.scss";

export function App({handleShow, handleClose, location}) {
  return (
    <ul className="navbar">
      <MenuIcon onOpen={handleShow} onClose={handleClose} />
      <span>
        <p>{ location }</p>
      </span>
      <MoreIcon onMore={handleShow} onClose={handleClose} />
      <SearchIcon onSearch={handleShow} onClose={handleClose} />
    </ul>
  );
}

const
  mapStateToProps = function ({location}) {
    return { location };
  },
  mapDispatchToProps = function (dispatch) {
    return {
      handleShow: function (panel) {
        dispatch(openPanel(panel));
      },
      handleClose: function () {
        dispatch(closePanel());
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);