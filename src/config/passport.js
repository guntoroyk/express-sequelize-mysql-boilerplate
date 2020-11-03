import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './config';
import db from './sequelize';
import logger from '~/config/winston/get-default-logger';

const { user: User } = db;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

const jwt = async (payload, done) => {
    try {
        const user = await User.findOne({ where: { id: payload.user.id } });

        if (user) {
            return done(null, user, payload);
        }
        return done(null, false);
    } catch (err) {
        logger.error(JSON.stringify(err, null, 2));
        return done(err, false);
    }
};

const strategies = {
    jwt: new Strategy(jwtOptions, jwt),
};

export default strategies;
