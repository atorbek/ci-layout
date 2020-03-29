const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const createError = require('http-errors');

const settingsRouter = require('./routes/api/settings');
const buildsRouter = require('./routes/api/builds');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', settingsRouter, buildsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
