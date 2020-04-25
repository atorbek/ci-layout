declare interface Build {
  id: string;
  configurationId: string;
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: string;
  start?: string;
  duration?: string;
}

declare interface Configuration {
  id: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}
