const config = require('axios');
const https = require('https');

const axiosInstance = config.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 30000 * 60,
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    'Content-Type': 'application/json'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

module.exports = axiosInstance;
