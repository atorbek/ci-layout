import { axiosInstance } from '../../config';

export const postSettings = async (body) =>
  await axiosInstance.post('/settings', body);
