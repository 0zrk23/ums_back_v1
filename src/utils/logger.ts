import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston'; 
import { LOG_DIR } from '../config';

// logs dir
const logDir: string = join(__dirname, LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
export const logger = winston.createLogger({
  
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.prettyPrint(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error', dirname: logDir}),
    new winston.transports.File({filename: 'combined.log', dirname: logDir}),
    new winston.transports.Console(),
  ],
});
