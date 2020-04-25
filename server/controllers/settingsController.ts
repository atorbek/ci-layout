import axiosInstance from '../config';
import { gitClone } from '../utils/repos';
import { isRepo, saveRepo } from '../utils/cache';
import { Request, Response } from 'express';
const axios = axiosInstance;
const getSettings = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get('/conf');
    res.status(200).json(data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

const postSettings = async ({ body }: Request, res: Response) => {
  try {
    const { status, statusText } = await axios.post('/conf', body);
    const { repoName } = body;

    if (!isRepo(repoName)) {
      await gitClone(process.env.WORKSPACES, repoName);
      saveRepo(repoName);
    }

    res.status(status).json({ statusText });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

export default {
  getSettings,
  postSettings
};
