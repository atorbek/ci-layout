import { handleActions } from 'redux-actions';
import {
  handleShowMore,
  fetchBuildsAsync,
  handleRunBuildAsync
} from './HistoryPageActions';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootSettingsState } from '../StartPage';
import { FormState } from 'redux-form';

export const builds = handleActions(
  {
    [handleShowMore.toString()]: (state) => state,
    [fetchBuildsAsync.request.toString()]: ({ data }) => ({
      load: true,
      data
    }),
    [fetchBuildsAsync.success.toString()]: ({ data }, action) => ({
      load: false,
      data: action.payload.data
    }),
    [fetchBuildsAsync.failure.toString()]: ({ data }) => ({
      load: false,
      data
    })
  },
  { load: false, data: [] }
);

export const runBuild = handleActions(
  {
    [handleRunBuildAsync.request.toString()]: (state) => state,
    [handleRunBuildAsync.success.toString()]: (state, action) => ({
      run: true,
      data: action.payload.data
    })
  },
  { run: false, data: {} }
);

export declare interface RootBuildsState {
  builds: {
    load: boolean;
    data: Build[];
  };
}

export declare interface RootRunState {
  runBuild: {
    run: boolean;
    data: Build;
  };
}

export const useBuildsSelector: TypedUseSelectorHook<RootBuildsState> = useSelector;
export const useRunSelector: TypedUseSelectorHook<RootRunState> = useSelector;
export const useFormSelector: TypedUseSelectorHook<FormState> = useSelector;

export const getBuilds = ({ builds: { data } }: RootBuildsState) => data;
export const getIsAdded = ({ runBuild: { run } }: RootRunState) => run;
export const getBuildId = ({
  runBuild: {
    data: { id }
  }
}: RootRunState) => id;
export const getRepoName = ({ settings: { data } }: RootSettingsState) =>
  data.repoName;
export const isLoadBuilds = ({ builds: { load } }: RootBuildsState) => load;
