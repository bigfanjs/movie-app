import React from "react";
import {connect} from "react-redux";

import Navbar from "../../../../../components/navbar";

import MovieList from "../movie-list";
import MovieFilter from "../movie-filter";

import movieFilter from "./action";

import classNames from "./app.scss";

export default connect()(
  function App({movies, dispatch}) {
    const handleFilter = function (movies) {
      dispatch(movieFilter(movies));
    };

    return (
      <div className={classNames.movieList}>
        <Navbar />
        <MovieFilter onfilter={handleFilter} />
        <MovieList movies={movies} />
      </div>
    );
  }
);