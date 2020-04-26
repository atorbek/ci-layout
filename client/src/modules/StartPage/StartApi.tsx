import { axiosInstance } from '../../config';

type GetSettingsResponse = Configuration;
export const getSettings = async (): Promise<Configuration> => {
  const resp = await axiosInstance.get<GetSettingsResponse>('/settings');
  return resp.data;
};
