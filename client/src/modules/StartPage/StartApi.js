import { axiosInstance } from '../../axios';

export const getSettings = async () => {
  const resp = await axiosInstance.get('/settings');
  return resp.data;
};
