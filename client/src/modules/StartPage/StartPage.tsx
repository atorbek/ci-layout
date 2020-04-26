import { handleActions } from 'redux-actions';
import { fetchSettingsAsync } from './StartActions';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const settings = handleActions(
  {
    [fetchSettingsAsync.request.toString()]: () => ({ load: true }),
    [fetchSettingsAsync.success.toString()]: (state, action) => ({
      load: false,
      ...action.payload
    }),
    [fetchSettingsAsync.failure.toString()]: (state, action) => ({
      load: false,
      ...action.payload
    })
  },
  { load: false }
);

export default settings;

export declare interface RootSettingsState {
  settings: {
    load: boolean;
    data: Configuration;
  };
}

export const useTypedSelector: TypedUseSelectorHook<RootSettingsState> = useSelector;

export const getIsSettings = ({ settings }: RootSettingsState): boolean => {
  return settings.hasOwnProperty('data');
};

export const getIsLoad = ({ settings }: RootSettingsState): boolean =>
  settings.load;
