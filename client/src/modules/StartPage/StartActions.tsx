import { createAsyncAction } from 'typesafe-actions';

export const fetchSettingsAsync = createAsyncAction(
  'FETCH_SETTINGS',
  'FETCH_SETTINGS_SUCCESS',
  'FETCH_SETTINGS_ERROR'
)<string, Configuration, ErrorState>();
