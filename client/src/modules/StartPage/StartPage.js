import { handleActions } from 'redux-actions';
import {
  handleSettings,
  handleSettingsSuccess,
  handleSettingsError
} from './StartActions';

const settings = handleActions(
  {
    [handleSettings]: () => ({ load: true }),
    [handleSettingsSuccess]: (state, action) => ({
      load: false,
      ...action.payload
    }),
    [handleSettingsError]: (state, action) => ({
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
