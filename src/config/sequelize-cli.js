/**
 * Config file for sequelize-cli
 */

require('dotenv').config();

const Joi = require('@hapi/joi');

const schema = Joi.object({
    UNIQUE_NAME_MYSQL_DB: Joi.string()
        .default('api')
        .description('MySQL database name'),
    UNIQUE_NAME_MYSQL_TEST_DB: Joi.string()
        .default('api-test')
        .description('MySQL database for tests'),
    UNIQUE_NAME_MYSQL_PORT: Joi.number().default(5432),
    UNIQUE_NAME_MYSQL_HOST: Joi.string().default('localhost'),
    UNIQUE_NAME_MYSQL_USER: Joi.string()
        .required()
        .default('postgres')
        .description('MySQL username'),
    UNIQUE_NAME_MYSQL_PASSWD: Joi.string()
        .allow('')
        .default('password')
        .description('MySQL password'),
    UNIQUE_NAME_MYSQL_SSL: Joi.bool()
        .default(false)
        .description('Enable SSL connection to MySQL'),
    UNIQUE_NAME_MYSQL_CERT_CA: Joi.string().description('SSL certificate CA'), // Certificate itself, not a filename
})
    .unknown()
    .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    development: {
        dialect: 'mysql',
        database: envVars.UNIQUE_NAME_MYSQL_DB,
        username: envVars.UNIQUE_NAME_MYSQL_USER,
        password: envVars.UNIQUE_NAME_MYSQL_PASSWD,
        host: envVars.UNIQUE_NAME_MYSQL_HOST,
        port: envVars.UNIQUE_NAME_MYSQL_PORT,
        migrationStorageTableName: 'sequelize_meta',
        seederStorage: 'sequelize',
        seederStorageTableName: 'sequelize_data'
    },
};

module.exports = config;
