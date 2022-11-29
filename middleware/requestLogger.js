import morgan from 'morgan';
import dotenv from "dotenv";

import logger from '../utils/logger.js';

dotenv.config()

logger.stream = {
    write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

let format = 'common';
if (process.env.NODE_ENV === 'development') {
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    format = ':method :url :status :response-time ms - :body'
}

export default morgan(
    format,
    { stream: logger.stream }
);