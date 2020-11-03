import app from './config/express';

// eslint-disable-next-line
Promise = require('bluebird');

// module.parent check is required to support mocha watch
if (!module.parent) {
    // eslint-disable-next-line
    require('./config/http').default(app);
}

export default app;
