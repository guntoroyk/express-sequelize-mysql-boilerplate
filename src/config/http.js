import fs from 'fs';
import { loggers } from 'winston';
import config from './config';

const https = require('https');
const http = require('http');

const logger = loggers.get(config.loggerName);

export default (app) => {
    let server;

    if (config.APP_HTTPS === 'true') {
        // credential
        const credentials = {
            key: fs.readFileSync(config.SSL_KEY_PATH, 'utf8'),
            cert: fs.readFileSync(config.SSL_CERT_PATH, 'utf8'),
            ca: [fs.readFileSync(config.SSL_CA_BUNDLE_PATH, 'utf8')],
        };

        if (config.SSL_PASSPHRASE)
            credentials.passphrase = config.SSL_PASSPHRASE;

        server = app
            ? https.createServer(credentials, app)
            : https.createServer(credentials);
    } else {
        server = app ? http.createServer(app) : http.createServer();
    }

    return server.listen(config.port, () => {
        logger.info(
            `The application has started on port ${config.port} (${config.env})`
        ); // eslint-disable-line no-console
    });
};
