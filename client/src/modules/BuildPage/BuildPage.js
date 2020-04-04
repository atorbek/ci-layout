import { handleActions } from 'redux-actions';
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

export const rebuild = handleActions(
  {
    [handleRebuild]: (state) => state,
    [handleRebuildSuccess]: (state, { payload: { data } }) => ({
      rebuild: true,
      data
    }),
    [handleRebuildError]: (state, { payload: { error } }) => ({
      ...state,
      error
    })
  },
  { rebuild: false, data: {}, error: {} }
);

export const log = handleActions(
  {
    [fetchLog]: (state) => state,
    [fetchLogSuccess]: (state, { payload }) => ({
      load: true,
      log: payload
    }),
    [fetchLogError]: (state) => state
  },
  { load: false, log: '' }
);

export const getBuild = ({ build: { data } }) => data;
export const getLog = ({ log: { log } }) => log;
export const isLoadBuild = ({ build: { load } }) => load;
export const isLoadLog = ({ log: { load } }) => load;
export const isRebuild = ({ rebuild: { rebuild } }) => rebuild;
export const getRebuild = ({ rebuild: { data } }) => data;
