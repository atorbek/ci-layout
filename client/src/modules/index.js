import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import settingsSet, { sagas as SettingsSagas } from './SettingsPage';

export default combineReducers({
  settingsSet
});

export function* rootSaga() {
  yield fork(SettingsSagas);
}
