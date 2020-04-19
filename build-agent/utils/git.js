const { spawn } = require('child_process');
const { parse } = require('path');

function Git({ repoName, path }) {
  const _parseRepoName = (fullname) => {
    const arr = fullname.split('/');
    const len = arr.length;
    return parse(arr[len - 1]).name;
  };

  const name = _parseRepoName(repoName);
  const fullPath = `${path}/${name}`;

  this.getName = () => name;
  this.getFullPath = () => fullPath;

  this.clone = () => {
    return new Promise((resolve, reject) => {
      const clone = spawn('git', ['clone', repoName], {
        cwd: path
      });

      clone.on('close', () => {
        resolve();
      });

      clone.on('error', (error) => {
        reject(error);
      });
    });
  };

  this.checkout = (commitHash) => {
    return new Promise((resolve, reject) => {
      const clone = spawn('git', ['checkout', commitHash], {
        cwd: fullPath
      });

      clone.on('close', () => {
        resolve();
      });

      clone.on('error', (data) => {
        reject(data);
      });
    });
  };

  this.remove = () => {
    return new Promise((resolve, reject) => {
      const clone = spawn('rm', ['-rf', name], {
        cwd: path,
        shell: true
      });

      clone.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      clone.stderr.on('data', (error) => {
        console.log(error.toString());
      });

      clone.on('close', () => {
        resolve();
      });

      clone.on('error', (data) => {
        reject(data);
      });
    });
  };
}

module.exports = Git;
