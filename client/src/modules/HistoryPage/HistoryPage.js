import { handleActions } from 'redux-actions';
import {
  fetchBuilds,
  fetchBuildsSuccess,
  fetchBuildsError,
  handleShowMore,
  handleRunBuild,
  handleRunBuildSuccess
} from './HistoryPageActions';

export const builds = handleActions(
  {
    [handleShowMore]: (state) => state,
    [fetchBuilds]: ({ data }) => ({ load: false, data }),
    [fetchBuildsSuccess]: ({ data }, action) => ({
      load: true,
      data: action.payload
    }),
    [fetchBuildsError]: ({ data }) => ({
      load: false,
      data
    })
  },
  { load: false, data: [] }
);

export const runBuild = handleActions(
  {
    [handleRunBuild]: (state) => state,
    [handleRunBuildSuccess]: (state, action) => ({
      run: true,
      data: action.payload.data
    })
  },
  { run: false, data: {} }
);

export const getBuilds = ({ builds: { data } }) => data;
export const getIsAdded = ({ runBuild: { run } }) => run;
export const getBuildId = ({
  runBuild: {
    data: { id }
  }
}) => id;

export const isLoadBuilds = ({ load }) => load;
