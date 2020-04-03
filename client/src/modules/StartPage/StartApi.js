import { axiosInstance } from '../../config';

export const getSettings = async () => {
  const resp = await axiosInstance.get('/settings');
  return resp.data;
};
