export default function (state = [], action) {
  switch (action.type) {
    case "ADD_MOVIES":
      return [...state, ...action.movies];
    case "DELETE_MOVIE":
      return state.filter((movie) => movie.id === action.id);
    default:
      return state;
  }
}