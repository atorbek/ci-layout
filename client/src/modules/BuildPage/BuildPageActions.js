import { createAction } from 'redux-actions';

export const fetchBuild = createAction('FETCH_BUILD');
export const fetchBuildSuccess = createAction('FETCH_BUILD_SUCCESS');
export const fetchBuildError = createAction('FETCH_BUILD_ERROR');

export const fetchLog = createAction('FETCH_LOG');
export const fetchLogSuccess = createAction('FETCH_LOG_SUCCESS');
export const fetchLogError = createAction('FETCH_LOG_ERROR');

export const handleRebuild = createAction('HANDLE_REBUILD');
export const handleRebuildSuccess = createAction('HANDLE_REBUILD_SUCCESS');
export const handleRebuildError = createAction('HANDLE_REBUILD_ERROR');
