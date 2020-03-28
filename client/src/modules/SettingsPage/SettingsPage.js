import { handleActions } from 'redux-actions';
import {
  handleSettings,
  handleSettingsConfigured,
  handleNoSettings
} from './SettingsActions';

const settingsSet = handleActions(
  {
    [handleSettings]: () => {},
    [handleSettingsConfigured]: (state, action) => action.payload,
    [handleNoSettings]: (state, action) => action.payload
  },
  {}
);

export default settingsSet;
export const getIsSettings = ({ settingsSet }) =>
  Object.keys(settingsSet).length === 0 && settingsSet.constructor === Object;
