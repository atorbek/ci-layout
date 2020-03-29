import { takeLatest, put, call, fork } from 'redux-saga/effects';
import {
  handleSettings,
  handleSettingsSuccess,
  handleSettingsError
} from './StartActions';
import { getSettings } from './StartApi';

function* fetchSettingsWatcher() {
  yield takeLatest(handleSettings, fetchSettingsFlow);
}

export function* fetchSettingsFlow() {
  try {
    const settings = yield call(getSettings);
    yield put(handleSettingsSuccess(settings));
  } catch (e) {
    throw new handleSettingsError({ error: e.message });
  }
}

export default function* () {
  yield fork(fetchSettingsWatcher);
}
