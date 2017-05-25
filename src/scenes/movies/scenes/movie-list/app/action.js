export default function (movies) {
  return {
    type: "MOVIE_FILTER",
    movies: movies
  };
}