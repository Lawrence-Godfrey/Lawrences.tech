const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRouter = require('./routes/authRoutes');

// app.use('/', indexRouter);
app.use('api/auth', authRouter);


export default app;
