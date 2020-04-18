const express = require('express');
const router = express.Router();

const builds = require('../../controllers/buildsController');

router.get('/builds', builds.getBuilds);
router.post('/builds/:commitHash', builds.postBuild);
router.get('/builds/:buildId', builds.getBuild);
router.get('/builds/:buildId/logs', builds.getBuildLog);

module.exports = router;
