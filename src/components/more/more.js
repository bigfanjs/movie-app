import React from "react";
import {connect} from "react-redux";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import closeMore from "./action";

import styles from "./more.scss";

class More extends React.Component {
  constructor(props) {
    super(props);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener("click", this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick, false);
  }

  handleDocumentClick(e) {
    const more = this.more;

    if (more && !more.contains(e.target)) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <ul
        ref={(node) => {this.more = node;}}
        className={styles.more}>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Help/FAQ</a>
        </li>
        <li>
          <a href="#">Support us</a>
        </li>
        <li>
          <a href="#">Contact us</a>
        </li>
      </ul>
    );
  }
}

const
  mapStateToProps = function ({visiblePanel}) {
    return { isVisible: visiblePanel === "more" };
  },
  mapDispatchToProps = function (dispatch) {
    return {
      closeMore: function () {
        dispatch(closeMore());
        document.body.style.overflowY = "visible";
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(
  ({isVisible, closeMore}) => (
    <CSSTransitionGroup
      component={({children}) => children[0] || null}
      transitionName={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        leave: styles.leave,
        leaveActive: styles.leaveActive
      }}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={100}>
      { isVisible && <More onClose={closeMore} isVisible={isVisible} /> }
    </CSSTransitionGroup>
  )
);