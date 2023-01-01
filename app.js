import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import morganBody from 'morgan-body';
import session from 'express-session';
import mongoDBSession from 'connect-mongodb-session';
import flash from 'connect-flash';

import { authRouter, userRouter } from './routes/index.js';
import requestLogger from './middleware/requestLogger.js';
import logger from './utils/logger.js';
import passport from './controllers/oauthController.js';

dotenv.config()
let MongoDBStore = mongoDBSession(session);

const app = express();

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

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  // 1 day
        secure: false
    },
    store: store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


export default app;
