import React from "react";
import {connect} from "react-redux";

import {openPanel, touchIcon} from "./action";

import MenuIcon from "../menu-icon";
import MoreIcon from "../more-icon";
import SearchIcon from "../search-icon";

import styles from "./app.scss";

const Navbar = function ({handleTouchStart, handleTouchFinish, handleShow}) {
  return (
    <ul className={styles.navbar}>
      <MenuIcon
        onTouchStart={handleTouchStart}
        onTouchFinish={handleTouchFinish}
        onOpen={handleShow}
        />
      <li className={styles.location}>
        <h1>Movies</h1>
      </li>
      <SearchIcon onSearch={handleShow} />
      <MoreIcon onMore={handleShow} />
    </ul>
  );
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleShow(panel) {
      dispatch(openPanel(panel));
      document.body.style.overflowY = "hidden";
    },
    handleTouchStart(icon) {
      dispatch(touchIcon(icon));
    },
    handleTouchFinish() {
      dispatch(touchIcon(""));
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Navbar);