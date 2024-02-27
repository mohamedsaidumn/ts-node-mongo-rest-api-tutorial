import { createLogger, format, transports, Logger, level  } from 'winston';

const {combine, timestamp, printf, colorize} = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

const devLogger = (): Logger => {

    const logger = createLogger({
        level: 'debug',
        format: combine(
            colorize(),
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                myFormat
            ),     
        transports: [
            new transports.Console()
        ],
      });

      return logger;    
}

const prodLogger = (): Logger => {

  const logger = createLogger({
      level: 'debug',
      format: combine(
              timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
              myFormat
          ),     
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
          new transports.Console()
      ],
    });

    return logger;    
}

export {devLogger, prodLogger}