import { handleActions } from 'redux-actions';
import {
  fetchSettings,
  fetchSettingsSuccess,
  fetchSettingsError
} from './StartActions';

const settings = handleActions(
  {
    [fetchSettings]: () => ({ load: true }),
    [fetchSettingsSuccess]: (state, action) => ({
      load: false,
      ...action.payload
    }),
    [fetchSettingsError]: (state, action) => ({
      load: false,
      ...action.payload
    })
  },
  { load: false }
);

export default settings;
export const getIsSettings = ({ settings }) => {
  return settings.hasOwnProperty('data');
};
export const getIsLoad = ({ settings }) => settings.load;
