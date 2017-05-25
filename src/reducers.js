import {combineReducers} from "redux";

import {visiblePanel} from "./components/navbar";
import {movies} from "./scenes/movies/scenes/movie-list";

export default combineReducers({visiblePanel, movies});