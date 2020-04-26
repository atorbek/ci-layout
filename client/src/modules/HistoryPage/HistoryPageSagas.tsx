import { takeLatest, put, call, fork, select } from 'redux-saga/effects';
import {
  fetchBuildsAsync,
  handleShowMore,
  handleRunBuildAsync
} from './HistoryPageActions';
import { getBuilds, sendBuildToQueue } from './HistoryPageApi';
import { startSubmit, stopSubmit, SubmissionError } from 'redux-form';
import { formNames } from '../../config';

function* fetchBuildsWatcher() {
  yield takeLatest([fetchBuildsAsync.request, handleShowMore], fetchBuildsFlow);
}

function* fetchRunBuildWatcher() {
  yield takeLatest(handleRunBuildAsync.request, fetchRunBuildFlow);
}

type ActionBuilds = ReturnType<typeof handleRunBuildAsync.request>;
function* fetchRunBuildFlow(action: ActionBuilds) {
  const { formRunBuildModal } = formNames;
  try {
    yield put(startSubmit(formRunBuildModal));
    const commitHash = action.payload;
    const newBuild = yield call(sendBuildToQueue, commitHash);
    yield put(stopSubmit(formRunBuildModal));
    yield put(handleRunBuildAsync.success(newBuild));
  } catch (e) {
    yield put(stopSubmit(formRunBuildModal, { error: e.message }));
    throw new SubmissionError({ error: e.message });
  }
}

export type Builds = { data: Build[] };
type ActionRunBuild =
  | ReturnType<typeof fetchBuildsAsync.request>
  | ReturnType<typeof handleShowMore>;
export function* fetchBuildsFlow(action: ActionRunBuild) {
  try {
    const limit = action.payload;
    const { data: builds }: Builds = yield call(getBuilds, limit);
    if (action.type === 'HANDLE_SHOW_MORE') {
      const state = yield select();
      const data = [...state.builds.data, ...builds];
      yield put(fetchBuildsAsync.success({ data }));
    } else {
      yield put(fetchBuildsAsync.success({ data: builds }));
    }
  } catch (e) {
    fetchBuildsAsync.failure({ error: e.message });
    throw e;
  }
}

export default function* () {
  yield fork(fetchBuildsWatcher);
  yield fork(fetchRunBuildWatcher);
}
