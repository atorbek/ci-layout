import { createAction } from 'redux-actions';

export const handleSettings = createAction('HANDLE_SETTINGS');
export const handleSettingsSuccess = createAction('HANDLE_SETTINGS_SUCCESS');
export const handleSettingsError = createAction('HANDLE_SETTINGS_ERROR');
