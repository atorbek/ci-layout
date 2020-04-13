const axios = require('../../config');
const {
  isLogExist,
  setLogPath,
  createLogFile,
  readLogFile
} = require('../../utils/cache');
const { commitInfo, parseRepoName } = require('../../utils/repos');

const getBuilds = async (req, res) => {
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

const postBuild = async (req, res) => {
  try {
    const settings = await axios.get('/conf');
    const repo = settings.data.data.repoName;
    const repoName = parseRepoName(repo);

    const { authorName, commitMessage, branchName } = await commitInfo(
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

const getBuild = async (req, res) => {
  try {
    const build = await axios.get('/build/details', {
      params: {
        buildId: req.query.buildId
      }
    });

    res.status(200).json(build.data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

const getBuildLog = async (req, res) => {
  const {
    params: { buildId }
  } = req;

  try {
    const build = await axios.get(
      '/build/log',
      {
        params: {
          buildId
        }
      },
      {
        headers: {
          'Content-Type': 'text/plain'
        },
        responseType: 'stream'
      }
    );

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

module.exports = {
  getBuilds,
  postBuild,
  getBuild,
  getBuildLog
};
