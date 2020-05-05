const retry = require('async-retry');
const { axiosInstance: axios } = require('../config');
const { setCache, getPushSubscription } = require('../caches/utilsCache');
const {
  retryRequest = 20,
  buildPeriod = 50000,
  vapidPublicKey,
  vapidPrivateKey,
  email
} = require('../server-conf');
const webPush = require('web-push');

webPush.setVapidDetails(`mailto:${email}`, vapidPublicKey, vapidPrivateKey);

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
      body: { agentId, buildNumber, ...rest }
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

    sendNotification(buildNumber);

    res.status(200).json({});
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

/**
 * Кэширование подписки для push-уведомлений
 * @param req запрос
 * @param res ответ
 * @returns {Promise<void>}
 */
const postRegisterNotification = async (req, res) => {
  try {
    const subscription = {
      endpoint: req.body.endpoint,
      keys: {
        p256dh: req.body.keys.p256dh,
        auth: req.body.keys.auth
      }
    };

    setCache('pushSubscription', subscription);
    res.status(200).send('register notification success!');
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

/**
 * Отправка push-notification в браузер
 * после успешного выполнения сборки
 * @param build
 */
const sendNotification = (buildNumber) => {
  const subscription = getPushSubscription().value();

  const payload = JSON.stringify({
    title: 'Привет.',
    body: `Сборка ${buildNumber} успешно завершена!`
  });

  const options = {
    TTL: 3600 // 1sec * 60 * 60 = 1h
  };

  webPush
    .sendNotification(subscription, payload, options)
    .then(() => {
      console.log('Send welcome push notification');
    })
    .catch((err) => {
      console.error('Unable to send welcome push notification', err);
    });
};

module.exports = {
  postNotifyAgent,
  postNotifyBuildResult,
  postRegisterNotification
};
