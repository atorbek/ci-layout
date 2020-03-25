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

const parseRepoName = (fullname) => parse(fullname.split('/')[1]).name;

module.exports = {
  gitClone,
  commitInfo,
  parseRepoName
};
