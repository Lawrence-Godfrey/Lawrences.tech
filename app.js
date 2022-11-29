import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";

import { authRouter, userRouter } from './routes/index.js';
import requestLogger from './middleware/requestLogger.js';


dotenv.config()

const app = express();

// Logging middleware
app.use(requestLogger);

// Security middleware
app.use(helmet());

// Request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


export default app;
