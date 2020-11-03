import Joi from '@hapi/joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const schema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'production', 'test', 'provision')
        .default('development'),
    PORT: Joi.number().default(4000),
    API_VERSION: Joi.string().default('1.0').description('API Version'),
    JWT_SECRET: Joi.string()
        .required()
        .description('JWT Secret required to sign'),
    JWT_EXPIRATION: Joi.number().required().description('JWT Expiration'),
    OAUTH_REFRESH_EXPIRATION: Joi.number()
        .required()
        .description('Refresh Token Expiration'),
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
    UNIQUE_NAME_MYSQL_CERT_CA: Joi.string().description('SSL certificate CA'), // Certificate itself, not a filename,
    APP_HTTPS: Joi.bool()
        .default(false)
        .description('Enable SSL to app server'),
    SSL_KEY_PATH: Joi.string().description('SSL key path'),
    SSL_CERT_PATH: Joi.string().description('SSL certificate path'),
    SSL_PASSPHRASE: Joi.string().description('SSL passphrase'),
    SSL_CA_BUNDLE_PATH: Joi.string().description('SSL certificate CA'), // Certificate itself, not a filename
    CLIENT_WEB_URL: Joi.string().description('URL of web client'),
    EMAIL_GMAIL: Joi.string().email().description('Gmail account to send mail'),
    EMAIL_GMAIL_PASSWORD: Joi.string().description('Password email'),
})
    .unknown()
    .required();

const { error, value: envVars } = schema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const isTestEnvironment = envVars.NODE_ENV === 'test';

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    apiVersion: envVars.API_VERSION,
    jwtSecret: envVars.JWT_SECRET,
    jwtExpiration: envVars.JWT_EXPIRATION,
    oauthRefreshExpiration: envVars.OAUTH_REFRESH_EXPIRATION,
    otpSecret: envVars.OTP_SECRET,
    SSL_KEY_PATH: envVars.SSL_KEY_PATH,
    SSL_CERT_PATH: envVars.SSL_CERT_PATH,
    SSL_CA_BUNDLE_PATH: envVars.SSL_CA_BUNDLE_PATH,
    SSL_PASSPHRASE: envVars.SSL_PASSPHRASE,
    clientWebUrl: envVars.CLIENT_WEB_URL,
    emailAccount: envVars.EMAIL_GMAIL,
    emailPassword: envVars.EMAIL_GMAIL_PASSWORD,
    mysql: {
        db: isTestEnvironment
            ? envVars.UNIQUE_NAME_MYSQL_TEST_DB
            : envVars.UNIQUE_NAME_MYSQL_DB,
        port: envVars.UNIQUE_NAME_MYSQL_PORT,
        host: envVars.UNIQUE_NAME_MYSQL_HOST,
        user: envVars.UNIQUE_NAME_MYSQL_USER,
        passwd: envVars.UNIQUE_NAME_MYSQL_PASSWD,
        ssl: envVars.UNIQUE_NAME_MYSQL_SSL,
        ssl_ca_cert: envVars.UNIQUE_NAME_MYSQL_CERT_CA,
    },
};

export default config;
