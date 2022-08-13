import express from 'express';
import logger from 'morgan';
import { authRouter, userRouter } from './routes/index.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


export default app;
