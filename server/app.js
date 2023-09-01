import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import morganBody from 'morgan-body';
import session from 'express-session';
import mongoDBSession from 'connect-mongodb-session';
import flash from 'connect-flash';
import cors from 'cors';

import { authRouter, userRouter, articleRouter } from './routes/index.js';
import requestLogger from './middleware/requestLogger.js';
import logger from './utils/logger.js';
import passport from './authenticationStrategies/index.js';

dotenv.config()
let MongoDBStore = mongoDBSession(session);

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? [process.env.CLIENT_URL, /\.google\.com$/] : '*',
}));

// Logging middleware
app.use(requestLogger);
morganBody(app, {stream: {write: message => logger.info(message)}});  // Logs request and response body

// Security middleware
app.use(helmet());

// Request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authentication middleware
let store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'Sessions'
});

// Catch errors
store.on('error', function(error) {
    console.log(`Error: ${error}`);
});


if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy. Required since the app is
    // behind a proxy which terminates the SSL connection
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: process.env.NODE_ENV === 'production' ? 1000 * 60 * 60 * 2 : 1000 * 60 * 60 * 24 * 7 * 52,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
    },
    store: store,
    rolling: true, // Refreshes cookie expiration on every request
    resave: false, // Don't save session to store if unmodified
    saveUninitialized: false  // Don't create session until something is stored
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/articles', articleRouter);


export default app;
