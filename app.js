import express from 'express';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import authRouter from './routes/authRoutes.js';

// app.use('/', indexRouter);
app.use('api/auth', authRouter);


export default app;
