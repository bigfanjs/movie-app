import {combineReducers} from "redux";

import {visiblePanel} from "./components/navbar";
import {movies} from "./scenes/movies/scenes/movie-list";
import {touchedIcon} from "./components/touch-action";
import {percentage} from "./components/menu";

export default combineReducers({visiblePanel, movies, touchedIcon, percentage});