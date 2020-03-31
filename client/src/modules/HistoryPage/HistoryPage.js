import { handleActions } from 'redux-actions';
import {
  fetchBuilds,
  fetchBuildsSuccess,
  fetchBuildsError
} from './HistoryPageActions';

const builds = handleActions(
  {
    [fetchBuilds]: ({ data }) => ({ load: false, data }),
    [fetchBuildsSuccess]: ({ data }, action) => ({
      load: true,
      data: [...data, ...action.payload]
    }),
    [fetchBuildsError]: ({ data }) => ({
      load: false,
      data
    })
  },
  { load: false, data: [] }
);

export default builds;
export const getBuilds = ({ builds: { data } }) => data;
export const isLoadBuilds = ({ load }) => load;
