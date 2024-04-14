import { join } from 'path';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '../config';

const logDir: string = join(__dirname, LOG_DIR);

const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

export const loggerOptions: expressWinston.LoggerOptions = {
  // transports: [new winston.transports.Console()],
  // format: winston.format.combine(
  //   winston.format.colorize({all: true}),
  //   winston.format.json(),
  //   winston.format.prettyPrint(),
  // ),
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
    winston.format.colorize({all: true}),
    winston.format.prettyPrint(),
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
  meta: true, 
};