import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { startSubmit, stopSubmit, SubmissionError } from 'redux-form';
import { postSettings } from './SettingsPageApi';
import { handleSaveSettings } from './SettingsPageActions';

function* fetchSaveSettingsWatcher() {
  yield takeLatest(handleSaveSettings, fetchSaveSettingsFlow);
}

export function* fetchSaveSettingsFlow(action) {
  try {
    yield put(startSubmit('formSettings'));
    const settings = action.payload;
    yield call(postSettings, settings);
    yield put(stopSubmit('formSettings'));
  } catch (e) {
    yield put(stopSubmit('formSettings', { error: e.message }));
    throw new SubmissionError({ error: e.message });
  }
}

export default function* () {
  yield fork(fetchSaveSettingsWatcher);
}
