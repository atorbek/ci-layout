const { axiosInstance: axios } = require('../config');
const { setCache, getAgents } = require('../caches/utilsCache');
const { isEmptyObject } = require('../helpers/utils');
const { limitBuildInQueue, buildTimeout } = require('../server-conf');

const statuses = {
  FREE: 'free',
  BUSY: 'busy'
};

const buildStatuses = {
  START: 'start',
  CANCEL: 'cancel'
};

const sendTaskOnAgent = async ({ host, port, ...rest }) => {
  console.log('Send task on Agent');
  const url = `http://${host}:${port}`;
  await axios({
    method: 'post',
    url: '/build',
    baseURL: url,
    data: rest
  });
};

const changeBuildStatus = async (status, buildData) => {
  await axios.post(`/build/${status}`, {
    ...buildData
  });
};

const getSettings = async () => {
  const {
    data: { data }
  } = await axios.get('/conf');
  return ({ repoName, buildCommand } = data);
};

const getTaskInWaiting = (builds) => {
  const build = builds.reverse().find((build) => build.status === 'Waiting');
  return build !== undefined ? build : {};
};

const getFreeAgent = () => {
  let freeAgent = getAgents().find({ status: 'free' }).value();
  return (!freeAgent !== undefined && freeAgent) || {};
};

const diffDate = (d1, d2) => {
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60));
};

const getAgentTimeoutErrorAndFree = (timeout) => {
  const currentTime = new Date();

  getAgents()
    .forEach(async ({ agentId, status, build }) => {
      if (status !== statuses.BUSY) {
        return;
      }

      const startTime = new Date(build.dateTime);
      const diffTime = diffDate(startTime, currentTime);

      if (diffTime > timeout) {
        setCache('updateAgent', { agentId, status: statuses.FREE, build: {} });
        await changeBuildStatus(buildStatuses.CANCEL, {
          buildId: build.buildId
        });
      }
    })
    .value();
};

const getTask = async () => {
  try {
    const {
      data: { data }
    } = await axios.get('/build/list', {
      params: {
        offset: 0,
        limit: limitBuildInQueue
      }
    });

    return data !== undefined ? getTaskInWaiting(data) : {};
  } catch (e) {
    console.log('Error getTask:', e.message);
  }
};

setInterval(async () => {
  try {
    console.info('Start trigger');

    const task = await getTask();
    const agent = getFreeAgent();
    const isFreeAgent = isEmptyObject(agent);
    const isFreeTask = isEmptyObject(task);

    if (!isFreeTask && !isFreeAgent) {
      if (task.status === 'Waiting') {
        const buildData = { buildId: task.id, dateTime: new Date() };
        const cacheData = {
          agentId: agent.agentId,
          status: 'busy',
          build: buildData
        };

        const settings = await getSettings();
        const data = {
          ...agent,
          ...task,
          buildId: task.id,
          dateTime: buildData.dateTime,
          ...settings
        };

        await sendTaskOnAgent(data);
        Promise.all([
          changeBuildStatus(buildStatuses.START, buildData),
          setCache('updateAgent', cacheData)
        ]);

        console.info('End trigger');
      }
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}, 3000);

/**
 *
 */
setInterval(async () => {
  console.log('Check build timeout');
  getAgentTimeoutErrorAndFree(buildTimeout);
  console.log('Build timeout checked');
}, 1000 * 10);
