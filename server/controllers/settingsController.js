import axios from '../config';
import { gitClone } from '../utils/repos';
import { isRepo, saveRepo } from '../utils/cache';

const getSettings = async (req, res) => {
  try {
    const { data } = await axios.get('/conf');
    res.status(200).json(data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

const postSettings = async ({ body }, res) => {
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

const deleteSettings = async (req, res) => {
  try {
    await axios.delete('/conf');
    res.status(200);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

export default {
  getSettings,
  postSettings,
  deleteSettings
};
