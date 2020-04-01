import { takeLatest, put, call, fork, select } from 'redux-saga/effects';
import {
  fetchBuilds,
  fetchBuildsSuccess,
  fetchBuildsError,
  handleShowMore
} from './HistoryPageActions';
import { getBuilds } from './HistoryPageApi';

function* fetchBuildsWatcher() {
  yield takeLatest([fetchBuilds, handleShowMore], fetchBuildsFlow);
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
}
