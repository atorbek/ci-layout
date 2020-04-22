const retry = require('async-retry');
const { axiosInstance: axios } = require('../config');
const { setCache, getAgents } = require('../caches/utilsCache');
const { isEmptyObject, diffDate } = require('../helpers/utils');
const {
  limitBuildInQueue = 100,
  agentBuildTimeout = 120,
  agentBuildPeriod = 300000,
  retryRequest = 20,
  buildPeriod = 50000
} = require('../server-conf');

const statuses = {
  FREE: 'free',
  BUSY: 'busy'
};

const buildStatuses = {
  START: 'start',
  CANCEL: 'cancel'
};

const sendTaskOnAgent = async ({ host, port, ...rest }) => {
  const url = `http://${host}:${port}`;
  await retry(
    async () => {
      console.log('Send task on Agent');
      await axios({
        method: 'post',
        url: '/build',
        baseURL: url,
        data: rest
      });
    },
    {
      retries: retryRequest,
      maxTimeout: buildPeriod,
      onRetry: (error) => console.log(error.message)
    }
  );
};

const changeStatusBuild = async (status, buildData) => {
  await retry(
    async () => {
      console.log('Change status build');
      await axios.post(`/build/${status}`, {
        ...buildData
      });
    },
    {
      retries: retryRequest,
      maxTimeout: buildPeriod,
      onRetry: (error) => console.log(error.message)
    }
  );
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
        await changeStatusBuild(buildStatuses.CANCEL, {
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
          changeStatusBuild(buildStatuses.START, buildData),
          setCache('updateAgent', cacheData)
        ]);

        console.info('End trigger');
      }
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}, buildPeriod);

setInterval(async () => {
  console.log('Check build timeout');
  getAgentTimeoutErrorAndFree(agentBuildTimeout);
  console.log('Build timeout checked');
}, agentBuildPeriod);
