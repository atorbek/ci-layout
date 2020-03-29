const { spawn } = require('child_process');
const { parse } = require('path');

const gitClone = (path, fullname) =>
  spawn('git', ['clone', fullname], {
    cwd: path
  });

const commitInfo = (path, hash) =>
  spawn('git', ['log', '-1', '--pretty=format:"%an %s %D"', hash], {
    cwd: path
  });

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
