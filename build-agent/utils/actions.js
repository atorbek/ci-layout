const { spawn } = require('child_process');
const { workspaces } = require('../agent-conf');
const { axiosInstance: axios } = require('../config');
const retry = require('async-retry');
const Git = require('./git');
const { period, retryRequest } = require('../agent-conf');

const runCommand = async (repoPath, command) => {
  return new Promise((resolve) => {
    let log = '';
    const run = spawn(command, [], {
      cwd: repoPath,
      shell: true
    });

    run.stdout.on('data', (data) => {
      log = log + data;
      console.log(data.toString());
    });

    run.stderr.on('data', (error) => {
      log = log + error;
      console.log(error.toString());
    });

    run.on('error', (error) => {
      console.log(error);
    });

    run.on('close', (code) => {
      const meta = { buildLog: log, success: !code };
      resolve(meta);
    });
  });
};

const postNotifyBuildResult = async (data) => {
  try {
    await retry(
      async () => {
        console.log('Build result');
        await axios.post('/notify-build-result', data);
      },
      {
        retries: retryRequest,
        maxTimeout: period,
        onRetry: (error) => console.log(error.message)
      }
    );
  } catch (e) {
    console.log('Error notify build result:', e.message);
  }
};

const postNotifyAgent = async (data) => {
  try {
    await retry(
      async () => {
        console.log('Register agent');
        await axios.post('/notify-agent', data);
      },
      {
        retries: retryRequest,
        maxTimeout: period,
        onRetry: (error) => console.log(error.message)
      }
    );
  } catch (e) {
    console.log('Error notify agent result:', e.message);
    process.exit(1);
  }
};

const diffDate = (d1, d2) => {
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60));
};

const runActions = (data) => {
  return new Promise(async (resolve, reject) => {
    const {
      buildNumber,
      repoName,
      commitHash,
      buildCommand,
      dateTime,
      buildId,
      agentId
    } = data;
    let git;
    try {
      git = new Git({ repoName, path: workspaces });
      await git.clone(repoName);
      await git.checkout(commitHash);
      const result = await runCommand(git.getFullPath(), buildCommand);
      const duration = diffDate(new Date(dateTime), new Date());
      await postNotifyBuildResult({
        buildNumber,
        agentId,
        buildId,
        duration,
        ...result
      });
      resolve();
    } catch (e) {
      console.log('Error:', e);
      reject();
    } finally {
      console.log('Remove repository');
      git.remove();
    }
  });
};

module.exports = {
  runActions,
  postNotifyAgent
};
