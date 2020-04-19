const config = require('axios');
const https = require('https');
const { serverHost: host, serverPort: port } = require('./agent-conf');

const axiosInstance = config.create({
  baseURL: `${host}:${port}`,
  timeout: 30000 * 60,
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

module.exports = { axiosInstance };
