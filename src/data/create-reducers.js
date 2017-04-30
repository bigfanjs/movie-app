import {combineReducers} from 'redux';

export default function createReducer(asyncReducers) {
  combineReducers({ ...asyncReducers });
}