const retry = require('async-retry');
const { axiosInstance: axios } = require('../config');
const { setCache } = require('../caches/utilsCache');
const { retryRequest = 20, buildPeriod = 50000 } = require('../server-conf');

/**
 * Зарегистрировать агента
 * @param req запрос
 * @param res ответ
 * @returns {Promise<void>}
 */
const postNotifyAgent = async (req, res) => {
  let agentId = '';
  try {
    const { body } = req;

    agentId = setCache('agent', { status: 'free', ...body });
    res.status(200).json({});
  } catch (error) {
    setCache('removeAgent', agentId);
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

/**
 * Cохранить результаты сборки
 * @param req запрос
 * @param res ответ
 * @returns {Promise<void>}
 */
const postNotifyBuildResult = async (req, res) => {
  try {
    const {
      body: { agentId, ...rest }
    } = req;

    await retry(
      async () => {
        console.log('Send task on Agent');
        await axios.post('/build/finish', rest);
      },
      {
        retries: retryRequest,
        maxTimeout: buildPeriod,
        onRetry: (error) => console.log(error.message)
      }
    );

    setCache('updateAgent', {
      agentId,
      status: 'free',
      build: {}
    });

    res.status(200).json({});
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

module.exports = {
  postNotifyAgent,
  postNotifyBuildResult
};
