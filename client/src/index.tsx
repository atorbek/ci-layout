import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createAppStore from './store';
import { registerWorker } from './register-worker';
import Loader from './components/Loader';
import './i18n';

const store = createAppStore();

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

registerWorker().catch((e) => console.log(e));
