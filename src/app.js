import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import asyncComponent from "./components/async-component";

import "./app.scss";

const
  Movies = asyncComponent(() => (
    import("./scenes/movies/scenes/movie-list")
      .then(module => module.default)
  )),
  Watch = asyncComponent(() => (
    import("./scenes/movies/scenes/movie-watch")
      .then(module => module.default)
  )),
  Edit = asyncComponent(() => (
    import("./scenes/admin/scenes/movie-edit")
      .then(module => module.default)
  )),
  Shows = asyncComponent(() => (
    import("./scenes/shows/scenes/show-list")
      .then(module => module.default)
  )),
  Episode = asyncComponent(() => (
    import("./scenes/shows/scenes/episode-watch")
      .then(module => module.default)
  )),
  Dashboard = asyncComponent(() => (
    import("./scenes/admin/scenes/dashboard")
      .then(module => module.default)
  )),
  Login = asyncComponent(() => (
    import("./scenes/admin/scenes/login")
      .then(module => module.default)
  ));

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
        <Route path="/shows/" component={Shows} />
        <Route path="/movies/watch/:id" component={Watch} />
        <Route path="/shows/seasons/:id/episodes/:id" component={Episode} />
        <Route exact path="/admin" component={Admin} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/dashboard/movies/edit/:id" component={Edit} />
        <Route path="/admin/dashboard/shows/edit/:id" component={Edit} />
        <Route path="/admin/dashboard/movies/new" component={Edit} />
        <Route path="/admin/dashboard/shows/new" component={Edit} />
        <Route path="/admin/login" component={Login} />
      </div>
    </Router>
  );
}