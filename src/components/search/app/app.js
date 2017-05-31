import React from "react";
import {connect} from "react-redux";

import SearchInput from "../search-input";
import SearchResult from "../search-result";

import styles from "./app.scss";

function Search({className, onClose}) {
  return (
    <ul className={className}>
      <SearchInput onClose={onClose} />
      <SearchResult />
    </ul>
  );
}

const mapStateToProps = function ({visiblePanel}) {
  const {search, hide, show} = styles;

  return {
    className: `${search} ${visiblePanel === "search" ? show:visiblePanel == false ? hide:""}`
  };
};

export default connect(mapStateToProps)(Search);