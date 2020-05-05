const CACHE = 'cache-and-update';
const statics = /\.(?:png|gif|jpg|jpeg|svg|js|css)$/;
const fonts = new RegExp('(.*)yastatic.net/islands/(.*)');

self.addEventListener('install', (event) => {
  event.waitUntil(precache());
});

const precache = async () => {
  const cache = await caches.open(CACHE);
  return await cache.addAll(['./static']);
};

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      if (
        (!statics.test(event.request.url) ||
          event.request.url.indexOf('chrome-extension') !== -1) &&
        !fonts.test(event.request.url)
      ) {
        return await fetch(event.request);
      }

      let response = await fromCache(event.request);
      if (response) {
        event.waitUntil(update(event.request));
        return response;
      }

      response = await fetch(event.request);
      event.waitUntil(toCache(event.request, response.clone()));
      return response;
    })()
  );
});

const fromCache = async (request) => {
  const cache = await caches.open(CACHE);
  return await cache.match(request);
};

const toCache = async (request, response) => {
  const cache = await caches.open(CACHE);
  cache.put(request, response);
};

const update = async (request) => {
  const response = await fetch(request);
  toCache(request, response);
};

self.addEventListener('push', (event) => {
  let notificationData = {};

  try {
    notificationData = event.data.json();
  } catch (e) {
    notificationData = {
      title: 'Что-то пошло не так..',
      body: 'Обратись в тех. поддержку!'
    };
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body
    })
  );
});
