import React from "react";

export default function ({onOpen}) {
  return (
    <li onClick={onOpen}>
      <svg width="30" height="23">
        <rect x="0" y="0" width="30" height="3" fill="#fff" />
        <rect x="0" y="10" width="30" height="3" fill="#fff" />
        <rect x="0" y="20" width="30" height="3" fill="#fff" />
      </svg>
    </li>
  );
}