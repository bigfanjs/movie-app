import React from "react";

import {movieItem} from "./movie-item.scss";

export default function ({title, releaseYear, rating, cover}) {
  return (
    <li className={movieItem}>
      <img src="http://placehold.it/206x300" />
      <div>
        <span>
          <h2>{title}</h2>
          <h4>{releaseYear}</h4>
          <h4>{rating}</h4>
        </span>
      </div>
    </li>
  );
}