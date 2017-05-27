import React from "react";

import Navbar from "../../../../../components/navbar";

import MovieList from "../movie-list";

import classNames from "./app.scss";

export default function () {
  return (
    <div className={classNames.movieList}>
      <Navbar />
      <MovieList />
    </div>
  );
}