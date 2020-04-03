import { takeLatest, put, call, fork, select } from 'redux-saga/effects';
import {
  fetchBuilds,
  fetchBuildsSuccess,
  fetchBuildsError,
  handleShowMore,
  handleRunBuild
} from './HistoryPageActions';
import { getBuilds, sendBuildToQueue } from './HistoryPageApi';
import { startSubmit, stopSubmit, SubmissionError } from 'redux-form';
import { postSettings } from '../SettingsPage/SettingsPageApi';

function* fetchBuildsWatcher() {
  yield takeLatest([fetchBuilds, handleShowMore], fetchBuildsFlow);
}

function* fetchRunBuildWatcher() {
  yield takeLatest(handleRunBuild, fetchRunBuildFlow);
}

function* fetchRunBuildFlow(action) {
  try {
    yield put(startSubmit('formRunBuildModal'));
    const { commitHash } = action.payload;
    yield call(sendBuildToQueue, commitHash);
    yield put(stopSubmit('formRunBuildModal'));
  } catch (e) {
    yield put(stopSubmit('formRunBuildModal', { error: e.message }));
    throw new SubmissionError({ error: e.message });
  }
}

export function* fetchBuildsFlow(action) {
  try {
    const { offset, limit } = action.payload;
    const { data: builds } = yield call(getBuilds, offset, limit);

    if (action.type === handleShowMore().type) {
      const state = yield select();
      const stateBuilds = [...state.builds.data, ...builds];
      yield put(fetchBuildsSuccess(stateBuilds));
    } else {
      yield put(fetchBuildsSuccess(builds));
    }
  } catch (e) {
    throw new fetchBuildsError({ error: e.message });
  }
}

export default function* () {
  yield fork(fetchBuildsWatcher);
  yield fork(fetchRunBuildWatcher);
}
