import { createAction } from 'redux-actions';

export const fetchBuild = createAction('FETCH_BUILD');
export const fetchBuildSuccess = createAction('FETCH_BUILD_SUCCESS');
export const fetchBuildError = createAction('FETCH_BUILD_ERROR');

export const fetchLog = createAction('FETCH_LOG');
export const fetchLogSuccess = createAction('FETCH_LOG_SUCCESS');
export const fetchLogError = createAction('FETCH_LOG_ERROR');
