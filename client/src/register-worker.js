const {
  pushServerKey,
  buildServerHost,
  buildServerPort
} = require('./client-conf');

const requestPermission = async () => {
  const permissionResult = await new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  });

  if (permissionResult !== 'granted') {
    throw new Error('Permission not granted.');
  }
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

const subscribeUserToPush = async (registration) => {
  try {
    let subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      return;
    }

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(pushServerKey)
    });

    fetch(`${buildServerHost}:${buildServerPort}/register-notification`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
  } catch (e) {
    console.log('Subscription failed with ' + e);
  }
};

export const registerWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers are not supported.');
    return;
  }

  if (!('PushManager' in window)) {
    console.log('Push-notification are not supported.');
    return;
  }

  await requestPermission();

  try {
    const registration = await navigator.serviceWorker.register(
      `./service-worker-custom.js`
    );
    await subscribeUserToPush(registration);
    console.log('Registration succeeded. Scope is ' + registration.scope);
  } catch (e) {
    console.log('Registration failed with ' + e);
  }
};
