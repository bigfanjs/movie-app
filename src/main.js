import React from 'react';
import Dom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import movieApp from './reducers';
import App from './app';

const store = createStore(movieApp);

const render = Component => (
  Dom.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
);

render(App);

if (module.hot) {
  module.hot.accept('./app', render.bind(null, App));
}