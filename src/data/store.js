import {createStore} from 'redux';

import createReducers from './create-reducers';

let store;

export default function configureStore(initialState) {
  store = createStore(createReducers(), initialState);
}

export function injectReducer(name, reducer) {
  if (typeof store === 'undefined') {
    configureStore({});
  }

  store.replaceWith(createReducers({[name]: reducer}));
}