import { createLogger, transports, format } from 'winston';
import dotenv from "dotenv";

dotenv.config()

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: './logs/all-logs.log',
            json: false,
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ]
});

if (process.env.NODE_ENV === 'development') {
    logger.add(new transports.Console());
}

export default logger;