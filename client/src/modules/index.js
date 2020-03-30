import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import settings, { sagas as StartSagas } from './StartPage';
import { sagas as SettingsSagas } from './SettingsPage';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  settings,
  form: formReducer
});

export function* rootSaga() {
  yield fork(StartSagas);
  yield fork(SettingsSagas);
}
