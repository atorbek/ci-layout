import express from 'express';
const router = express.Router();
import builds from '../../controllers/buildsController';

type GetBuildsQueryParams = { offset: string; limit: string };
type GetBuildsResponse = Build[];
router.get<{}, GetBuildsResponse, GetBuildsQueryParams>(
  '/builds',
  builds.getBuilds
);

type PostBuildResponse = Partial<
  Pick<Build, 'commitMessage' | 'commitHash' | 'branchName' | 'authorName'>
>;
type commitHashQueryParam = { commitHash: string };
router.post<{}, PostBuildResponse, commitHashQueryParam>(
  '/builds/:commitHash',
  builds.postBuild
);

type GetBuildResponse = Build;
type GetBuildIdQueryParam = { buildId: string };
router.get<{}, GetBuildResponse, GetBuildIdQueryParam>(
  '/builds/:buildId',
  builds.getBuild
);

router.get<{}, String, GetBuildIdQueryParam>(
  '/builds/:buildId/logs',
  builds.getBuildLog
);

export default router;
