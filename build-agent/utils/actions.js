const { spawn } = require('child_process');
const { workspaces } = require('../agent-conf');
const { axiosInstance: axios } = require('../config');
const Git = require('./git');

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

const postNotifyBuildResult = (data) => {
  let registered = false;
  const id = setInterval(async () => {
    console.log('Register agent');
    try {
      if (registered) {
        clearInterval(id);
        return;
      }

      await axios.post('/notify-build-result', data);
      registered = true;
    } catch (e) {
      console.log('Error notify build result:', e.message);
    }
  }, 5000);
};

const postNotifyAgent = (data) => {
  let registered = false;
  const id = setInterval(async () => {
    console.log('Register agent');
    try {
      if (registered) {
        clearInterval(id);
        return;
      }

      await axios.post('/notify-agent', data);
      registered = true;
    } catch (e) {
      console.log('Error notify agent result:', e.message);
    }
  }, 5000);
};

const diffDate = (d1, d2) => {
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60));
};

const runActions = (data) => {
  return new Promise(async (resolve, reject) => {
    const {
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
      git.remove();
    }
  });
};

module.exports = {
  runActions,
  postNotifyAgent
};
