import React from "react";
import {connect} from "react-redux";

import addMovies from "./action";

import MovieItem from "../movie-item";

import {movieList} from "./movie-list.scss";

class MovieList extends React.Component {
  componentWillMount () {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((movies) => {
        this.props.dispatch(addMovies(movies));
      });
  }
  
  render() {
    return (
      <ul className={movieList}>
        { this.props.movies.map((movie) => (
            <MovieItem key={movie._id} {...movie} />
          )) }
      </ul>
    );
  }
}

const mapStateToProps = function ({movies}) {
  return {movies};
}

export default connect(mapStateToProps)(MovieList);

// import React from "react";

// export default function () {
//   return (
//     <div>Movie List!</div>
//   );
// }