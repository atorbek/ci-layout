import { takeLatest, put, call, fork } from 'redux-saga/effects';
import {
  fetchSettings,
  fetchSettingsSuccess,
  fetchSettingsError
} from './StartActions';
import { getSettings } from './StartApi';

function* fetchSettingsWatcher() {
  yield takeLatest(fetchSettings, fetchSettingsFlow);
}

export function* fetchSettingsFlow() {
  try {
    const settings = yield call(getSettings);
    yield put(fetchSettingsSuccess(settings));
  } catch (e) {
    throw new fetchSettingsError({ error: e.message });
  }
}

export default function* () {
  yield fork(fetchSettingsWatcher);
}
