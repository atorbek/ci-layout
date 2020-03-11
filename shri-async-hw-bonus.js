(() => {
  Promise._all = values =>
    new Promise((resolve, reject) => {
      let resolutions = [];
      if (!Array.isArray(values)) {
        reject("values isn't iterable object");
      }

      let count = values.length;
      if (!count) {
        resolve(resolutions);
      }

      values.forEach((value, i) => {
        Promise.resolve(value)
          .then(value => {
            resolutions[i] = value;
            if (--count === 0) {
              resolve(resolutions);
            }
          })
          .catch(reason => {
            reject(reason);
          });
      });
    });

  Promise._any = values =>
    new Promise((resolve, reject) => {
      let resolutions = [];
      if (!Array.isArray(values)) {
        reject("values isn't iterable object");
      }

      let count = values.length;
      if (!count) {
        resolve(resolutions);
      }

      values.forEach((value, i) => {
        Promise.resolve(value)
          .then(value => {
            resolve(value);
          })
          .catch(reason => {
            resolutions[i] = reason;
            if (--count === 0) {
              reject(resolutions);
            }
          });
      });
    });

  Promise._allSettled = promises =>
    // Вызвал свою реализацию метода Promise.all
    Promise._all(
      promises.map(promise =>
        Promise.resolve(promise)
          .then(value => ({
            status: 'fulfilled',
            value
          }))
          .catch(reason => ({
            status: 'rejected',
            reason
          }))
      )
    );

  Promise.prototype._finally = function(cb) {
    const constructor = this.constructor;

    return this.then(
      value => constructor.resolve(cb()).then(() => value),
      reason => constructor.resolve(cb()).then(() => reason)
    );
  };
})();
