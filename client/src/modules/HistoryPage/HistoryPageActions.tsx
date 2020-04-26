import { createAction } from 'redux-actions';
import { createAsyncAction } from 'typesafe-actions';
import { LimitBuilds } from './HistoryPageApi';
import { Builds } from './HistoryPageSagas';

export const fetchBuildsAsync = createAsyncAction(
  'FETCH_BUILDS',
  'FETCH_BUILDS_SUCCESS',
  'FETCH_BUILDS_ERROR'
)<LimitBuilds, Builds, ErrorState>();

export const handleShowMore = createAction('HANDLE_SHOW_MORE');

export const handleRunBuildAsync = createAsyncAction(
  'HANDLE_RUN_BUILD',
  'HANDLE_RUN_BUILD_SUCCESS',
  'HANDLE_RUN_BUILD_ERROR'
)<string, Build[], ErrorState>();
