import { createAction } from 'redux-actions';

export const fetchBuilds = createAction('FETCH_BUILDS');
export const fetchBuildsSuccess = createAction('FETCH_BUILDS_SUCCESS');
export const fetchBuildsError = createAction('FETCH_BUILDS_ERROR');
