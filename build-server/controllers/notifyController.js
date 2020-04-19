const { axiosInstance: axios } = require('../config');
const { setCache } = require('../caches/utilsCache');

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
    await axios.post('/build/finish', rest);

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
