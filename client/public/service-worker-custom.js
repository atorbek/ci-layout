/** @alias ServiceWorkerGlobalScope */
let self = this;
const CACHE_NAME = `static-files`;
const statics = /.(?:png|gif|jpg|jpeg|svg|js|css|)$/;
const fonts = `https://yastatic.net/islands/(.*)`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['./static/']);
    })
  );
});

const updateCache = async (request) => {
  const responseToCache = request.clone();
  const cache = await caches.open(CACHE_NAME);
  cache.put(event.request, responseToCache);
};

self.addEventListener('fetch', async (event) => {
  if (statics.test(event.request.url) || fonts.test(event.request.url)) {
    const response = await caches.match(event.request);

    if (response) {
      event.respondWith(response);
      event.waitUntil(await updateCache(response));
      return;
    }

    const fetchRequest = event.request.clone();
    const fetchResponse = await fetch(fetchRequest);
    if (
      !fetchResponse ||
      fetchResponse.status !== 200 ||
      fetchResponse.type !== 'basic'
    ) {
      return event.respondWith(fetchResponse);
    }

    event.respondWith(fetchResponse);
    event.waitUntil(await updateCache(fetchResponse));
  }

  // event.respondWith(
  //   (async () => {
  //     if (statics.test(event.request.url) || fonts.test(event.request.url)) {
  //       const response = await caches.match(event.request);
  //
  //       // если в кэше найдено то, что нужно, мы можем тут же вернуть ответ.
  //       if (response) {
  //         return response;
  //       }
  //
  //       const fetchRequest = event.request.clone();
  //       const fetchResponse = await fetch(fetchRequest);
  //       if (
  //         !fetchResponse ||
  //         fetchResponse.status !== 200 ||
  //         fetchResponse.type !== 'basic'
  //       ) {
  //         return fetchResponse;
  //       }
  //
  //       const responseToCache = fetchResponse.clone();
  //       const cache = await caches.open(CACHE_NAME);
  //       cache.put(event.request, responseToCache);
  //
  //       return fetchResponse;
  //     }
  //
  //     return await fetch(event.request);
  //   })()
  // );
});
