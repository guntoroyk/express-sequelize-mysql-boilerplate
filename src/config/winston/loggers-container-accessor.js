import winston from 'winston';
import 'winston-daily-rotate-file';
// import winstonRotate from 'winston-daily-rotate-file';
import { developmentFormatter, productionFormatter } from './winston-formatter';

const { loggers, format, transports } = winston;
const { printf, timestamp, combine, colorize } = format;

/*
 * We leverage Winston's built-in containers (loggers) to store and access your
 * custom loggers. Since this writes to a singleton reference, we won't be returning
 * anything in this function.
 */

// const getTransport = (level) => {
//     return new winstonRotate({
//         name: `log-${level}`,
//         level: level,
//         json: true,
//         stringify: (obj) => JSON.stringify(obj),
//         datePattern: 'yyyy-MM-DD',
//         prepend: true,
//         filename: `logs/%DATE%_${level}.log`,
//         maxFiles: '14d',
//     });
// };

const transportDailyRotate = new winston.transports.DailyRotateFile({
    filename: 'logs/api-logs_%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d',
});

const createLoggerWithOptions = (options) => {
    const loggerOptions = {
        transports: [
            new transports.Console(),
            // getTransport('error'),
            // getTransport('info'),
            transportDailyRotate,
            // new (transports.File)(optionsFile.file),
            // new winston.transports.File({ filename: 'logs/winston.log' }),
        ],
        level: options.logLevel,
        format:
            options.env === 'production'
                ? combine(timestamp(), productionFormatter(printf))
                : combine(
                      timestamp(),
                      colorize(),
                      developmentFormatter(printf)
                  ),
    };
    loggers.add(options.name, loggerOptions);
    /*
     * Now you can get your custom configured logger anywhere in the code by either:
     *    import winston from 'winston';
     *    logger = winston.loggers.get('my-custom-logger');
     * or
     *    import { loggers } from 'winston';
     *    logger = loggers.get('my-custom-logger');
     */
};

export default createLoggerWithOptions;
