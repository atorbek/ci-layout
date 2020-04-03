import { axiosInstance } from '../../config';

export const getBuilds = async (offset, limit) => {
  const resp = await axiosInstance.get(
    `/builds?offset=${offset}&limit=${limit}`
  );
  return resp.data;
};

export const sendBuildToQueue = async (commitHash) => {
  const resp = await axiosInstance.post(`/builds/${commitHash}`);
  return resp.data;
};
