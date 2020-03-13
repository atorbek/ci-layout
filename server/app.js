const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const settingsRouter = require('./routes/api/settings');
const buildsRouter = require('./routes/api/builds');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', settingsRouter, buildsRouter);

module.exports = app;
