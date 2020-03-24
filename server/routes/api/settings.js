const express = require('express');
const router = express.Router();
const axios = require('../../config');
const { gitClone } = require('../../utils/repos');
const { isRepo, saveRepo } = require('../../utils/cache');

router.get('/settings', async (req, res) => {
  try {
    const { data } = await axios.get('/conf');
    res.json(data);
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
});

router.post('/settings', async ({ body }, res) => {
  try {
    const { status, statusText } = await axios.post('/conf', body);
    const { repoName } = body;

    if (!isRepo(repoName)) {
      const clone = gitClone(process.env.WORKSPACES, repoName);

      clone.on('close', code => {
        if (code === 0) {
          saveRepo(repoName);
        }
      });
    }

    res.status(status).json({ statusText });
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
});

module.exports = router;
