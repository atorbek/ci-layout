import { axiosInstance } from '../../axios';

export const getBuild = async (id) => {
  const resp = await axiosInstance.get(`/builds/${id}`);
  return resp.data;
};

export const getLog = async (id) => {
  const resp = await axiosInstance.get(`/builds/${id}/logs`, {
    'Content-Type': 'text/plain'
  });
  return resp.data;
};
