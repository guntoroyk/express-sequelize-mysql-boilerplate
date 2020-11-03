import { loggers } from 'winston';
import config from '~/config/config';
import createLoggerWithOptions from './loggers-container-accessor';

const loggerOptions = {
    name: config.loggerName,
    env: config.env,
    logLevel: config.logLevel,
};
createLoggerWithOptions(loggerOptions);

const logger = loggers.get(config.loggerName);

// logger.stream();

export default logger;
