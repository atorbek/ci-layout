import { handleActions } from 'redux-actions';
import {
  fetchBuilds,
  fetchBuildsSuccess,
  fetchBuildsError
} from './HistoryPageActions';

const builds = handleActions(
  {
    [fetchBuilds]: (state) => [...state],
    [fetchBuildsSuccess]: (state, action) => [...state, ...action.payload],
    [fetchBuildsError]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  []
);

export default builds;
export const getBuilds = ({ builds }) => builds;
