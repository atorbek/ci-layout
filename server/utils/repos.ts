import { spawn } from 'child_process';
import { parse } from 'path';

const defaultPath: string = '/app';
const gitClone = (
  path: string = defaultPath,
  fullname: string
): Promise<Error | number> => {
  return new Promise((resolve, reject) => {
    const clone = spawn('git', ['clone', fullname], {
      cwd: path
    });

    clone.on('close', (code) => {
      resolve(code);
    });

    clone.on('error', (error) => {
      reject(error);
    });
  });
};

export type CommitDetails = Partial<
  Pick<Build, 'commitMessage' | 'branchName' | 'authorName'>
>;

export type ReturnCommitDetails = Promise<CommitDetails>;
const commitInfo = (path: string, hash: string): ReturnCommitDetails => {
  return new Promise((resolve, reject) => {
    const info = spawn(
      'git',
      [
        'log',
        '-1',
        '--pretty=format:{"authorName":"%cn", "commitMessage":"%s", "branchName":"master" }',
        hash
      ],
      {
        cwd: path
      }
    );

    info.stdout.on('data', async (result) => {
      const commitInfo: CommitDetails = JSON.parse(result);
      resolve(commitInfo);
    });

    info.on('error', (error) => {
      reject(error);
    });
  });
};

const parseRepoName = (fullname: string): string => {
  const arr = fullname.split('/');
  const len = arr.length;
  return parse(arr[len - 1]).name;
};

export { gitClone, commitInfo, parseRepoName };
