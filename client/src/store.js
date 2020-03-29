import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const preloadedstate = { settings: { load: false } };

  const store = createStore(
    rootReducer,
    preloadedstate,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default createAppStore;
