const makeServiceWorkerEnv = require('service-worker-mock');

describe('service-worker-custom.js', () => {
  beforeEach(() => {
    const serviceWorkerEnv = makeServiceWorkerEnv();
    Object.defineProperty(serviceWorkerEnv, 'addEventListener', {
      value: serviceWorkerEnv.addEventListener,
      enumerable: true
    });
    Object.assign(global, serviceWorkerEnv);
    jest.resetModules();
    require('../public/service-worker-custom');
  });

  it('Должен добавить слушателей', () => {
    // Действия
    const install = self.listeners.get('install');
    const fetch = self.listeners.get('fetch');

    // Проверка
    expect(install).toBeDefined();
    expect(fetch).toBeDefined();
  });

  it('Должен вернуть данные с сервера', async () => {
    // Подготовка
    require('../public/service-worker-custom');
    const fetchedResponse = { clone: jest.fn() };
    global.fetch = () => fetchedResponse;
    const cachedRequest = new Request('/test/style.css');

    // Действия и проверки
    const response = await self.trigger('fetch', cachedRequest);
    expect(fetchedResponse).toBe(response);
  });
});
