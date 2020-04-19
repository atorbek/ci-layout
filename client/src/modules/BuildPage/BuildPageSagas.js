import { takeLatest, put, call, fork } from 'redux-saga/effects';
import {
  fetchBuild,
  fetchBuildSuccess,
  fetchBuildError,
  fetchLog,
  fetchLogSuccess,
  fetchLogError,
  handleRebuild,
  handleRebuildSuccess,
  handleRebuildError
} from './BuildPageActions';
import { getBuild, getLog } from './BuildPageApi';
import { sendBuildToQueue } from '../HistoryPage/HistoryPageApi';

function* fetchBuildWatcher() {
  yield takeLatest(fetchBuild, fetchBuildFlow);
}

function* fetchLogWatcher() {
  yield takeLatest(fetchLog, fetchLogFlow);
}

function* fetchRebuildWatcher() {
  yield takeLatest(handleRebuild, fetchRebuildFlow);
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

function* fetchRebuildFlow(action) {
  try {
    const commitHash = action.payload;
    const rebuild = yield call(sendBuildToQueue, commitHash);
    yield put(handleRebuildSuccess(rebuild));
  } catch (e) {
    console.log(e);
    yield put(handleRebuildError({ error: e.message }));
  }
}

export default function* () {
  yield fork(fetchBuildWatcher);
  yield fork(fetchLogWatcher);
  yield fork(fetchRebuildWatcher);
}
