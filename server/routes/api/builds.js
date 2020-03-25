const express = require('express');
const router = express.Router();
const axios = require('../../config');
const {
  isLogExist,
  setLogPath,
  createLogFile,
  readLogFile,
  isRepo
} = require('../../utils/cache');
const { commitInfo, parseRepoName } = require('../../utils/repos');

router.get('/builds', async (req, res) => {
  try {
    const list = await axios.get('/build/list');
    res.json(list.data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
});

router.post('/builds/:commitHash', async (req, res) => {
  try {
    const data = await axios.get('/conf');
    const repo = data.data.data.repoName;
    const repoName = parseRepoName(repo);

    if (!isRepo(repo)) {
      throw 'Error in repositories. Is repository cloned?';
    }

    commitInfo(
      `${process.env.WORKSPACES}/${repoName}`,
      req.params.commitHash
    ).stdout.on('data', async (info) => {
      const [authorName, commitMessage, branchName] = info
        .toString()
        .split(' ');

      const { status, statusText } = await axios.post('/build/request', {
        commitMessage,
        commitHash: req.params.commitHash,
        branchName,
        authorName
      });

      res.json({ status, statusText });
    });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
});

router.get('/builds/:buildId', async (req, res) => {
  try {
    const build = await axios.get(
      `/build/details?buildId=${req.params.buildId}`
    );
    res.json(build.data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
});

router.get('/builds/:buildId/logs', async (req, res) => {
  const {
    params: { buildId }
  } = req;

  try {
    const build = await axios.get(`/build/log?buildId=${buildId}`, {
      headers: {
        'Content-Type': 'text/plain'
      },
      responseType: 'stream'
    });

    const path = `${process.env.TMP}/${buildId}.txt`;

    console.log(isLogExist(buildId));

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
});

module.exports = router;
