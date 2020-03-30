import { axiosInstance } from '../../axios';

export const postSettings = async (body) =>
  await axiosInstance.post('/settings', body);
