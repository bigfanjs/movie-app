import React from "react";

import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";
import Search from "../../../../../components/search";
import Shadow from "../../../../../components/shadow";

import MovieList from "../movie-list";

export default function () {
  return (
    <div>
      <Navbar />
      <Menu />
      <Search />
      <Shadow />
      <MovieList />
    </div>
  );
}