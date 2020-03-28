import { createAction } from 'redux-actions';

export const handleSettings = createAction('HANDLE_SETTINGS');
export const handleSettingsConfigured = createAction(
  'HANDLE_SETTINGS_CONFIGURED'
);
export const handleNoSettings = createAction('HANDLE_NO_SETTINGS');
