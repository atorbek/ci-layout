const axios = require('axios');
const { withNaming } = require('@bem-react/classname');

const cn = withNaming({ e: '__', m: '_', v: '_' });

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const formNames = {
  formSettings: 'formSettings',
  formRunBuildModal: 'formRunBuildModal'
};

module.exports = {
  cn,
  axiosInstance,
  formNames
};
