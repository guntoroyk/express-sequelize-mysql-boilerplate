import app from './config/express';

Promise = require('bluebird');

// module.parent check is required to support mocha watch
if (!module.parent) {
    require('./config/http').default(app);
}

export default app;
