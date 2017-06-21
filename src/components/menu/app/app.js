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
  translateX,
  touchstart,
  touchend
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
    this.props.touchstart();
  }

  handleTouchEnd(e) {
    this.props.touchend();

    if (!this.props.isVisible && this.clientX > 20) return;

    const
      menu = this.menu,
      isTouchOut = menu && !menu.contains(e.target);

    const {percentage, isVisible} = this.props;

    if (percentage < -50 || (isVisible && isTouchOut && !this.touchMove)) {
      this.props.closeMenu();
      this.props.translateX(-100);
    } else {
      this.props.openMenu();
      this.props.translateX(0);
    }
  }

  handleTouchMove(e) {
    if (!this.props.isVisible && this.clientX > 20) return;

    const
      width = 80 * window.innerWidth / 100,
      clientX = e.touches[0].clientX - this.clientX,
      value = this.props.initPercent + (clientX / width * 100),
      percentage = Math.max(-100, Math.min(value, 0));

    this.props.translateX(percentage);
  }

  render() {
    const {onSelect, openFilter, percentage, initPercent, isHeld} = this.props;

    const style = {
      transform: `translateX(${ isHeld ? percentage : initPercent }%)`,
      transition: !isHeld ? "transform 100ms ease-in" : "none"
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
  mapStateToProps = function ({visiblePanel, percentage, touch}) {
    return {
      isVisible: visiblePanel === "menu",
      initPercent: visiblePanel === "menu" ? 0 : -100,
      isHeld: touch,
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
      touchstart: function () {
        dispatch(touchstart());
      },
      touchend: function () {
        dispatch(touchend());
      },
      closeMenu: dispatch.bind(null, closeMenu()),
      openMenu: dispatch.bind(null, openMenu()),
      openFilter: dispatch.bind(null, showFilter())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);