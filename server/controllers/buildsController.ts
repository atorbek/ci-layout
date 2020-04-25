import axios from '../config';
import { Request, Response } from 'express';
import {
  createLogFile,
  isLogExist,
  readLogFile,
  setLogPath
} from '../utils/cache';
import { commitInfo, parseRepoName } from '../utils/repos';

const getBuilds = async (req: Request, res: Response)  => {
  try {
    const { offset, limit } = req.query;
    const list = await axios.get('/build/list', {
      params: {
        offset,
        limit
      }
    });

    res.status(200).json(list.data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

const postBuild = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await axios.get('/conf');
    const repo = settings.data.data.repoName;
    const repoName = parseRepoName(repo);

    const { commitMessage, branchName, authorName } = await commitInfo(
      `${process.env.WORKSPACES}/${repoName}`,
      req.params.commitHash
    );

    const {
      data: { data }
    } = await axios.post('/build/request', {
      commitMessage,
      commitHash: req.params.commitHash,
      branchName,
      authorName
    });
    res.status(200).json({ data });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

const getBuild = async (req: Request, res: Response) => {
  try {
    const build = await axios.get('/build/details', {
      params: {
        buildId: req.params.buildId
      }
    });

    res.status(200).json(build.data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

const getBuildLog = async (req: Request, res: Response) => {
  const {
    params: { buildId }
  } = req;

  try {
    const build = await axios.get('/build/log', {
      params: {
        buildId
      },
      headers: {
        'Content-Type': 'text/plain'
      },
      responseType: 'stream'
    });

    const path = `${process.env.TMP}/${buildId}.txt`;

    if (isLogExist(buildId)) {
      readLogFile(path).pipe(res);
    } else {
      setLogPath(path);
      build.data.pipe(createLogFile(path));
      build.data.pipe(res);
    }
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

export default {
  getBuilds,
  postBuild,
  getBuild,
  getBuildLog
};
