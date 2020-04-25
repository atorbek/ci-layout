import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();
import createError from 'http-errors';
import routers from './routes';

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

app.use('/api', routers.routers);

app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
