import { loggers } from 'winston';
import config from './config/config';
import app from './config/express';

const debug = require('debug')('omorfia-backend:index');

// Get default logger
const logger = loggers.get(config.loggerName);

Promise = require('bluebird');

// module.parent check is required to support mocha watch
if (!module.parent) {
    require('./config/http').default(app);
}

export default app;
