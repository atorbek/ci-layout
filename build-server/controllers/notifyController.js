const axios = require('../config');
const { setCache } = require('../caches/utilsCache');

/**
 * Зарегистрировать агента
 * @param req запрос
 * @param res ответ
 * @returns {Promise<void>}
 */
const postNotifyAgent = async (req, res) => {
  try {
    const { body } = req;

    setCache('agent', body);

    res.status(200);
  } catch (error) {
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
    const { body } = req;

    await axios.get('/build/finish', {
      params: { body }
    });

    res.status(200);
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
