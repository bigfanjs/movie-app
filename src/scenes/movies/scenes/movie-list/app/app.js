import React from "react";

import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";

import MovieList from "../movie-list";

// import classNames from "./app.scss";

export default function () {
  return (
    <div>
      <Navbar />
      <Menu />
      <MovieList />
    </div>
  );
}