import React from "react";

import styles from "./touch-action.scss";

class TouchAction extends React.Component {
  componentDidMount() {
    const anim = this.circle.animate([
      { transform: "scale(0)", opacity: 1 },
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(1)", opacity: 0.01 }
    ], {
      duration: 500,
      fill: "forwards"
    });

    anim.onfinish = () => {
      const {onTouchFinish, onOpen} = this.props;

      onTouchFinish();
      onOpen();
    };
  }

  render() {
    return (
      <div
        className={styles.touch}
        ref={(node) => this.circle = node}
        />
    );
  }
}

export default TouchAction;