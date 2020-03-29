import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import settings, { sagas as StartSagas } from './StartPage';

export default combineReducers({
  settings
});

export function* rootSaga() {
  yield fork(StartSagas);
}
