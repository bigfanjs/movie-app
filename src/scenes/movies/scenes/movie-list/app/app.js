import React from "react";

import Navbar from "../../../../../components/navbar";
import Menu from "../../../../../components/menu";
import Search from "../../../../../components/search";
import More from "../../../../../components/more";
import Shadow from "../../../../../components/shadow";

import MovieList from "../movie-list";

export default function () {
  return (
    <div>
      <Navbar />
      <Menu />
      <More />
      <Search />
      <Shadow />
      <MovieList />
    </div>
  );
}