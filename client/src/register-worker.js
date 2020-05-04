const registerWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker-custom.js')
        .then((reg) => {
          console.log('Registration succeeded. Scope is ' + reg.scope);
        })
        .catch((err) => {
          console.log('Registration failed with ' + err);
        });
    });
  } else {
    console.log('Service workers are not supported.');
  }
};

export default registerWorker;
