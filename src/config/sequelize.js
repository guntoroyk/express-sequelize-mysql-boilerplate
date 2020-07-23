import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import config from './config';
import logger from './winston/get-default-logger';

const db = {};

const sequelizeOptions = {
    dialect: 'mysql',
    port: config.mysql.port,
    host: config.mysql.host,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    logging: false,
    // defining naming strategies to underscored
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    ...(config.mysql.ssl && {
        ssl: config.mysql.ssl,
    }),
    ...(config.mysql.ssl &&
        config.mysql.ssl_ca_cert && {
            dialectOptions: {
                ssl: {
                    ca: config.mysql.ssl_ca_cert,
                },
            },
        }),
};
const sequelize = new Sequelize(
    config.mysql.db,
    config.mysql.user,
    config.mysql.passwd,
    sequelizeOptions
);

const modelsDir = path.normalize(`${__dirname}/../api/models`);

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
    .filter((file) => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
    // import model files and save model names
    .forEach((file) => {
        logger.info(`Loading model file ${file}`);
        const model = sequelize.import(path.join(modelsDir, file));
        db[model.name] = model;
    });

// add association
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Synchronizing any model changes with database.
sequelize
    .sync()
    .then(() => {
        logger.info('Database synchronized');
    })
    .catch((error) => {
        if (error) {
            logger.error('An error occured: ', error);
        }
    });

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend(
    {
        sequelize,
        Sequelize,
    },
    db
);
