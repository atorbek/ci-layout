import { takeLatest, put, call, fork } from 'redux-saga/effects';
import {
  fetchBuild,
  fetchBuildSuccess,
  fetchBuildError,
  fetchLog,
  fetchLogSuccess,
  fetchLogError
} from './BuildPageActions';
import { getBuild, getLog } from './BuildPageApi';

function* fetchBuildWatcher() {
  yield takeLatest(fetchBuild, fetchBuildFlow);
}

function* fetchLogWatcher() {
  yield takeLatest(fetchLog, fetchLogFlow);
}

export function* fetchBuildFlow(action) {
  try {
    const { id } = action.payload;
    const { data: builds } = yield call(getBuild, id);
    yield put(fetchBuildSuccess(builds));
  } catch (e) {
    throw new fetchBuildError({ error: e.message });
  }
}

export function* fetchLogFlow(action) {
  try {
    const { id } = action.payload;
    const log = yield call(getLog, id);
    yield put(fetchLogSuccess(log));
  } catch (e) {
    throw new fetchLogError({ error: e.message });
  }
}

export default function* () {
  yield fork(fetchBuildWatcher);
  yield fork(fetchLogWatcher);
}
