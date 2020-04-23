import express from 'express';
const router = express.Router();

import builds from '../../controllers/buildsController';

router.get('/builds', builds.getBuilds);
router.post('/builds/:commitHash', builds.postBuild);
router.get('/builds/:buildId', builds.getBuild);
router.get('/builds/:buildId/logs', builds.getBuildLog);

export default router;
