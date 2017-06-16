import React from "react";
import {connect} from "react-redux";

import MoviesIcon from "../movies-icon";
import ShowsIcon from "../shows-icon";
import FilterIcon from "../filter-icon";

import {
  setLocation,
  showFilter,
  closeMenu,
  openMenu,
  translateX
} from "./action";

import styles from "./app.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    document.addEventListener("touchstart", this.handleTouchStart, false);
    document.addEventListener("touchend", this.handleTouchEnd, false);
    document.addEventListener("touchmove", this.handleTouchMove, false);
  }
  
  handleTouchStart(e) {
    this.clientX = e.touches[0].clientX;
    this.touch = true;
  }

  handleTouchEnd(e) {
    this.touch = false;

    if (!this.props.isVisible && this.clientX > 20) return;

    const
      menu = this.menu,
      percent = this.props.percentage,
      isTouchOut = menu && !menu.contains(e.target);

    if (percent < -50 || (percent == 0 && isTouchOut)) {
      this.props.closeMenu();
      this.props.translateX(-100, true);
    } else {
      this.props.openMenu();
      this.props.translateX(0, true);
    }
  }

  handleTouchMove(e) {
    if (!this.props.isVisible && this.clientX > 20) return;

    const
      width = 80 * window.innerWidth / 100,
      clientX = e.touches[0].clientX - this.clientX,
      value = this.props.initPercent + (clientX / width * 100),
      percentage = Math.max(-100, Math.min(value, 0));

    this.props.translateX(percentage, false);
  }

  render() {
    const {onSelect, openFilter, percentage, initPercent} = this.props;

    const style = {
      transform: `translateX(${ this.touch ? percentage : initPercent }%)`,
      transition: !this.touch ? "transform 100ms ease-in" : "none"
    };

    return (
      <ul
        ref={(node) => {this.menu = node;}}
        className={styles.menu}
        style={ style }>
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
  mapStateToProps = function ({visiblePanel, percentage}) {
    return {
      isVisible: visiblePanel === "menu",
      initPercent: visiblePanel === "menu" ? 0 : -100,
      percentage
    };
  },
  mapDispatchToProps = function (dispatch) {
    return {
      select: function (location) {
        dispatch(setLocation(location));
      },
      translateX: function (percentage) {
        dispatch(translateX(percentage));
      },
      closeMenu: dispatch.bind(null, closeMenu()),
      openMenu: dispatch.bind(null, openMenu()),
      openFilter: dispatch.bind(null, showFilter())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);