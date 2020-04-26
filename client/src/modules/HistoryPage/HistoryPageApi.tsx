import { axiosInstance } from '../../config';

type GetBuildsResponse = Build[];
export type LimitBuilds = { offset: number; limit: number };
export const getBuilds = async ({
  offset,
  limit
}: LimitBuilds): Promise<Build[]> => {
  const resp = await axiosInstance.get<GetBuildsResponse>(
    `/builds?offset=${offset}&limit=${limit}`
  );
  return resp.data;
};

export const sendBuildToQueue = async (commitHash: string): Promise<Build> => {
  const resp = await axiosInstance.post<Build>(`/builds/${commitHash}`);
  return resp.data;
};
