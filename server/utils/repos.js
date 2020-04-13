const { spawn } = require('child_process');
const { parse } = require('path');

const gitClone = (path, fullname) => {
  return new Promise((resolve, reject) => {
    const clone = spawn('git', ['clone', fullname], {
      cwd: path
    });

    clone.stdout.on('close', () => {
      resolve();
    });

    clone.stderr.on('close', (error) => {
      reject(error);
    });
  });
};

const commitInfo = (path, hash) => {
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
      const commitInfo = JSON.parse(result);
      resolve(commitInfo);
    });

    info.stderr.on('data', (error) => {
      reject(error);
    });
  });
};

const parseRepoName = (fullname) => {
  const arr = fullname.split('/');
  const len = arr.length;
  return parse(arr[len - 1]).name;
};

module.exports = {
  gitClone,
  commitInfo,
  parseRepoName
};
