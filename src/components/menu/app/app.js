import React from "react";
import {connect} from "react-redux";

import MoviesIcon from "../movies-icon";
import ShowsIcon from "../shows-icon";
import FilterIcon from "../filter-icon";

import {setLocation, showFilter, closeMenu} from "./action";

import styles from "./app.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentWillReceiveProps({isVisible}) {
    if (this.props.isVisible != isVisible) {
      if (isVisible) {
        document.addEventListener("click", this.handleDocumentClick, false);
      } else {
        document.removeEventListener("click", this.handleDocumentClick, false);
      }
    }
  }

  handleDocumentClick(e) {
    const menu = this.menu;

    if (menu && !menu.contains(e.target)) {
      this.props.closeMenu();
      document.body.style.overflowY = "visible";
    }
  }
  
  render() {
    const {onSelect, openFilter, className} = this.props;

    return (
      <ul
        ref={(node) => {this.menu = node;}}
        className={className}>
        <li>
          <h1>Movie App</h1>
        </li>
        <MoviesIcon onSelect={onSelect} />
        <ShowsIcon onSelect={onSelect} />
        <FilterIcon openFilter={openFilter} />
      </ul>
    );
  }
}

const
  mapStateToProps = function ({visiblePanel}) {
    const {menu, show, hide} = styles;

    return {
      isVisible: visiblePanel === "menu",
      className: `${menu} ${visiblePanel === "menu" ? show : visiblePanel == false ? hide : ""}`
    };
  },
  mapDispatchToProps = function (dispatch) {
    return {
      select: function (location) {
        dispatch(setLocation(location));
      },
      closeMenu: dispatch.bind(null, closeMenu()),
      openFilter: dispatch.bind(null, showFilter())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);