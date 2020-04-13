const express = require('express');
const router = express.Router();

const settings = require('./api/settings');
const builds = require('./api/builds');

router.get('/settings', settings.getSettings);
router.post('/settings', settings.postSettings);

router.get('/builds', builds.getBuilds);
router.post('/builds/:commitHash', builds.postBuild);
router.get('/builds/:buildId', builds.getBuild);
router.get('/builds/:buildId/logs', builds.getBuildLog);

module.exports = router;
