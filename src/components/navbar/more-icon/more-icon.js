import React from "react";

export default function ({onMore}) {
  return (
    <li onClick={onMore.bind(null, "more")}>
      <svg width="6" height="26">
        <circle cx="3" cy="3" r="3" fill="#fff" />
        <circle cx="3" cy="13" r="3" fill="#fff" />
        <circle cx="3" cy="23" r="3" fill="#fff" />
      </svg>
    </li>
  );
}