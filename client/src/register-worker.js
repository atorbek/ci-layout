const {
  pushServerKey,
  buildServerHost,
  buildServerPort
} = require('./client-conf');

const requestPermission = () => {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then((permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error('Permission not granted.');
    }
  });
};

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const subscribeUserToPush = () => {
  navigator.serviceWorker
    .register(`./service-worker-custom.js`)
    .then((registration) => {
      console.log('Registration succeeded. Scope is ' + registration.scope);
      return registration.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
          return subscription;
        }

        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(pushServerKey)
        });
      });
    })
    .then((subscription) => {
      fetch(`${buildServerHost}:${buildServerPort}/register-notification`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
    })
    .catch((err) => {
      console.log('Registration failed with ' + err);
    });
};

const registerWorker = () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers are not supported.');
    return;
  }

  if (!('PushManager' in window)) {
    console.log('Push-notification are not supported.');
    return;
  }

  requestPermission()
    .then(() => {
      subscribeUserToPush();
    })
    .catch((e) => console.log(e.message));
};

module.exports = registerWorker;
