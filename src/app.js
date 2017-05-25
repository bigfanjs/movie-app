import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import asyncComponent from "./components/async-component";
import Bundle from "./components/bundle";

import movieList from "bundle-loader?lazy!./scenes/movies/scenes/movie-list";
import movieWatch from "bundle-loader?lazy!./scenes/movies/scenes/movie-watch";
import movieEdit from "bundle-loader?lazy!./scenes/admin/scenes/movie-edit";

import showList from "bundle-loader?lazy!./scenes/shows/scenes/show-list";
import episode from "bundle-loader?lazy!./scenes/shows/scenes/episode-watch";
import showEdit from "bundle-loader?lazy!./scenes/shows/scenes/show-edit";

import dashboard from "bundle-loader?lazy!./scenes/admin/scenes/dashboard";
import login from "bundle-loader?lazy!./scenes/admin/scenes/login";

import "./app.scss";

const
  Movies = (props) => <Bundle load={movieList} {...props} />,
  Watch = (props) => <Bundle load={movieWatch} {...props} />,
  MovieEdit = (props) => <Bundle load={movieEdit} {...props} />;

const
  Shows = (props) => <Bundle load={showList} {...props} />,
  Episode = (props) => <Bundle load={episode} {...props} />,
  ShowEdit = (props) => <Bundle load={showEdit} {...props} />;

const
  Dashboard = (props) => <Bundle load={dashboard} {...props} />,
  Login = (props) => <Bundle load={login} {...props} />;

const Admin = asyncComponent(() => (
  fetch("/session")
    .then((admin) => admin.json())
    .then((json) => <Redirect to="/admin/dashboard" {...json} />)
    .catch(() => <Redirect to="/admin/login" />)
    .then(Component => () => Component)
));

export default function () {
  return (
    <Router>
      <div>
        <Route exact path="/" render={() => <Redirect to="/movies" />} />

        <Route exact path="/movies" component={Movies} />
        <Route path="/movies/watch/:id" component={Watch} />
        <Route path="/movies/edit/:id" component={MovieEdit} />
        <Route path="/movies/new" component={MovieEdit} />

        <Route exact path="/shows" component={Shows} />
        <Route path="/shows/seasons/:id/episodes/:id" component={Episode} />
        <Route path="/shows/edit/:id" component={ShowEdit} />
        <Route path="/shows/new" component={ShowEdit} />

        <Route exact path="/admin" component={Admin} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/login" component={Login} />
      </div>
    </Router>
  );
}