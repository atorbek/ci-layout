import { createAction } from 'redux-actions';

export const fetchSettings = createAction('FETCH_SETTINGS');
export const fetchSettingsSuccess = createAction('FETCH_SETTINGS_SUCCESS');
export const fetchSettingsError = createAction('FETCH_SETTINGS_ERROR');
