const makeServiceWorkerEnv = require('service-worker-mock');
const chai = require('chai');
const resetModules = require('decache');
const assert = chai.assert;

describe('service-worker-custom.js', () => {
  beforeEach(() => {
    resetModules('../public/service-worker-custom');
    Object.assign(global, makeServiceWorkerEnv());
  });

  it('Должен добавить слушателей', () => {
    // Подготовка
    require('../public/service-worker-custom');

    // Действия
    const install = self.listeners.get('install');
    const fetch = self.listeners.get('fetch');

    // Проверка
    assert.isDefined(install);
    assert.isDefined(fetch);
  });

  it('Должен вернуть данные с сервера', async () => {
    // Подготовка
    require('../public/service-worker-custom');
    const fetchedResponse = { clone: () => 'fetched css file' };
    global.fetch = () => fetchedResponse;
    const cachedRequest = new Request('/test/style.css');

    // Действия и проверки
    const response1 = await self.trigger('fetch', cachedRequest);
    assert.deepEqual(fetchedResponse, response1);
  });
});
