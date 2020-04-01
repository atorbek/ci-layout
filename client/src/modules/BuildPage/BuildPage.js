import { handleActions } from 'redux-actions';
import {
  fetchBuild,
  fetchBuildSuccess,
  fetchBuildError,
  fetchLog,
  fetchLogSuccess,
  fetchLogError
} from './BuildPageActions';

export const build = handleActions(
  {
    [fetchBuild]: ({ data }) => ({ load: false, data }),
    [fetchBuildSuccess]: ({ data }, action) => ({
      load: true,
      data: action.payload
    }),
    [fetchBuildError]: ({ data }) => ({
      load: false,
      data
    })
  },
  { load: false, data: [] }
);

export const log = handleActions(
  {
    [fetchLog]: (state) => state,
    [fetchLogSuccess]: ({ log }, action) => ({
      load: true,
      log: action.payload
    }),
    [fetchLogError]: (state) => state
  },
  { load: false, log: '' }
);

export const getBuild = ({ build: { data } }) => data;
export const getLog = ({ log: { log } }) => log;
export const isLoadBuild = ({ build: { load } }) => load;
export const isLoadLog = ({ log: { load } }) => load;
