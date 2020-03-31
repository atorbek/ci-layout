import { axiosInstance } from '../../axios';

export const getBuilds = async (offset, limit) => {
  const resp = await axiosInstance.get(
    `/builds?offset=${offset}&limit=${limit}`
  );
  return resp.data;
};
