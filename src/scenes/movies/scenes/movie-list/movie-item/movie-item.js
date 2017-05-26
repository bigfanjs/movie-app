import React from "react";

import {movieItem} from "./movie-item.scss";

export default function ({title, releaseYear, rating, cover}) {
  return (
    <li className={movieItem}>
      <img src={cover.path} />
      <span>
        <h2>{title}</h2>
        <h4>{releaseYear}</h4>
        <h4>{rating}</h4>
      </span>
    </li>
  );
}