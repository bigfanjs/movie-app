import React from "react";

import classNames from "./menu-icon.scss";

export default function ({onOpen}) {
  return (
    <div className={classNames.menuIcon} onClick={onOpen}>
      <svg width="30" height="23">
        <rect x="0" y="0" width="30" height="3" />
        <rect x="0" y="10" width="30" height="3" />
        <rect x="0" y="20" width="30" height="3" />
      </svg>
    </div>
  );
}