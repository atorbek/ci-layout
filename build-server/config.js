const config = require('axios');
const https = require('https');
const { apiToken: token, apiBaseUrl: apiUrl } = require('./server-conf');

const axiosInstance = config.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

module.exports = axiosInstance;
