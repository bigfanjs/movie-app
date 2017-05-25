import React from "react";
import ReactDom from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {createStore} from "redux";
import movieApp from "./reducers";
import App from "./app";

const store = createStore(movieApp);

const render = Component => (
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  )
);

render(App);

if (module.hot) {
  module.hot.accept("./app", render.bind(null, App));
  module.hot.accept("./reducers", function () {
    import("./reducers") // eslint-disable-line
      .then(nextReducer => {
        store.replaceReducer(nextReducer.default);
      });
  });
}