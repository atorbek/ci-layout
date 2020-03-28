import { takeLatest, select, put, call, fork } from 'redux-saga/effects';
import {
  handleSettings,
  handleSettingsConfigured,
  handleNoSettings
} from './SettingsActions';

function* fetchSettingsSetWatcher() {
  yield takeLatest(handleSettings, fetchSettingsFlow);
}

export function* fetchSettingsFlow() {
  try {
    // Дернуть настройки по api
    // yield call();
    // Запутить ответ
    // yield put(handleSettingsConfigured());
  } catch (e) {
    // Возможно стоит чекнуть ошибку
    throw new handleNoSettings(e.message);
  }
}

export default function* () {
  yield fork(fetchSettingsSetWatcher);
}
