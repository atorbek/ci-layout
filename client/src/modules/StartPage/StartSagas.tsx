import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { fetchSettingsAsync } from './StartActions';
import { getSettings } from './StartApi';

function* fetchSettingsWatcher() {
  yield takeLatest(fetchSettingsAsync.request, fetchSettingsFlow);
}

export function* fetchSettingsFlow() {
  try {
    const settings: Configuration = yield call(getSettings);
    yield put(fetchSettingsAsync.success(settings));
  } catch (e) {
    yield put(fetchSettingsAsync.failure({ error: e.message }));
  }
}

export default function* () {
  yield fork(fetchSettingsWatcher);
}
