(() => {
  const _wrap = (fn, cb) => {
    setTimeout(() => {
      cb(fn());
    }, Math.random() * 20);
  };

  const AsyncArray = function(initial) {
    if (initial && !(initial instanceof Array)) {
      throw new Error('initial value is not an array');
    }

    const a = initial ? Array.from(initial) : [];

    this.set = (index, value, cb) =>
      _wrap(() => {
        a[index] = value;
      }, cb);
    this.push = (value, cb) =>
      _wrap(() => {
        a.push(value);
      }, cb);

    this.get = (index, cb) => _wrap(() => a[index], cb);
    this.pop = cb => _wrap(() => a.pop(), cb);
    this.length = cb => _wrap(() => a.length, cb);

    this.print = () => {
      console.log(a.toString());
    };
  };

  const add = (a, b, cb) => _wrap(() => a + b, cb);
  const subtract = (a, b, cb) => _wrap(() => a - b, cb);
  const multiply = (a, b, cb) => _wrap(() => a * b, cb);
  const divide = (a, b, cb) => _wrap(() => a / b, cb);
  const mod = (a, b, cb) => _wrap(() => a % b, cb);

  const less = (a, b, cb) => _wrap(() => a < b, cb);
  const equal = (a, b, cb) => _wrap(() => a == b, cb);
  const lessOrEqual = (a, b, cb) => _wrap(() => a <= b, cb);
  const sqrt = (x, cb) => _wrap(() => Math.sqrt(x), cb);

  const _promisify = f => (...args) => {
    return new Promise(resolve => {
      const cb = result => {
        resolve(result);
      };
      f(...[...args, cb]);
    });
  };

  const accumVectors = (v1, v2, cb) => {
    _promisify(_wrap)(async () => {
      const getValueV1 = _promisify(v1.get);
      const getValueV2 = _promisify(v2.get);
      const v3 = new AsyncArray();
      const setValueV3 = _promisify(v3.set);

      const lenV1 = _promisify(v1.length);
      const promiseLess = _promisify(less);
      const promiseAdd = _promisify(add);

      let i = 0;
      while (await promiseLess(i, await lenV1())) {
        const values = Promise.all([getValueV1(i), getValueV2(i)]);
        const sum = await promiseAdd(...(await values));

        await setValueV3(i, sum);
        i = await promiseAdd(i, 1);
      }

      return v3;
    }).then(r => cb(r));
  };

  window.Homework = {
    AsyncArray,
    add,
    subtract,
    multiply,
    divide,
    mod,
    less,
    equal,
    lessOrEqual,
    sqrt,
    accumVectors
  };

  Object.freeze(window.Homework);
})();
