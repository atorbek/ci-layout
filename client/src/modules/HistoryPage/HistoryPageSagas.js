import { takeLatest, put, call, fork } from 'redux-saga/effects';
import {
  fetchBuilds,
  fetchBuildsSuccess,
  fetchBuildsError
} from './HistoryPageActions';
import { getBuilds } from './HistoryPageApi';

function* fetchBuildsWatcher() {
  yield takeLatest(fetchBuilds, fetchBuildsFlow);
}

export function* fetchBuildsFlow(action) {
  try {
    const { offset, limit } = action.payload;
    const { data: builds } = yield call(getBuilds, offset, limit);
    yield put(fetchBuildsSuccess(builds));
  } catch (e) {
    throw new fetchBuildsError({ error: e.message });
  }
}

export default function* () {
  yield fork(fetchBuildsWatcher);
}
