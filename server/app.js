const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const settingsRouter = require('./routes/api/settings');
const buildsRouter = require('./routes/api/builds');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', settingsRouter, buildsRouter);

module.exports = app;
