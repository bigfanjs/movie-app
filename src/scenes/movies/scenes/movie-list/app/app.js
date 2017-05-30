import React from "react";

import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";
import Shadow from "../../../../../components/shadow";

import MovieList from "../movie-list";

export default function () {
  return (
    <div>
      <Navbar />
      <Menu />
      <Shadow />
      <MovieList />
    </div>
  );
}