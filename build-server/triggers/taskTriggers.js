const axios = require('../config');
const { setCache, getFreeAgent } = require('../caches/utilsCache');
const { isEmptyObject } = require('../helpers/utils');

const sendTaskOnAgent = async (agent, task) => {
  const url = `${agent.host}${agent.port}`;
  const axiosOptions = { baseUrl: url };
  const taskData = { id: task.id, commitHash: task.commitHash };
  const { settings } = await getSettings();
  axios.post(
    '/build',
    {
      ...settings,
      ...taskData
    },
    axiosOptions
  );
};

const changeBuildStatus = async (status, buildData) => {
  axios.post(`/build/${status}`, {
    ...buildData
  });
};

const getSettings = async () => {
  const { data: data } = axios.get('/conf');
  return ({ repoName, buildCommand } = data);
};

const getTask = async () => {
  const { data: data } = axios.get('/build/list', {
    params: {
      offset: 1,
      limit: 1
    }
  });
  return data;
};

setInterval(async () => {
  try {
    console.info('Start trigger...');
    const task = await getTask();
    const agent = getFreeAgent();
    const isFreeAgent = isEmptyObject(agent);
    const isFreeTask = isEmptyObject(task);

    if (!(isFreeTask && isFreeAgent)) {
      const startTime = new Date();
      const cacheData = {
        agentId: agent.agentId,
        build: {
          buildId: task.id,
          startTime: startTime
        }
      };
      const buildData = { buildId: task.id, dateTime: startTime };

      await Promise.all([
        // sendTaskOnAgent(agent, task),
        setCache('build', cacheData)
        // changeBuildStatus('start', buildData)
      ]);
    }
  } catch (e) {
    console.log('Error', e.message);
  }
}, 3000);
