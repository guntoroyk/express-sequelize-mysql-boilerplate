import httpStatus from 'http-status';
import uniqid from 'uniqid';
import APIError from '~/api/helpers/APIError';
import db from '~/config/sequelize';
import bcrypt from '~/api/helpers/bcrypt';
import jwt from '~/api/helpers/jwt';
import logger from '~/config/winston/get-default-logger';

const { user: User } = db;

class AuthController {
    static async login(req, res, next) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            logger.info(user);

            if (!user) {
                const err = new APIError(
                    'Resource is not exists',
                    httpStatus.NOT_FOUND,
                    true
                );

                return next(err);
            }

            if (!bcrypt.comparePassword(password, user.password)) {
                const err = new APIError(
                    'Invalid password',
                    httpStatus.BAD_REQUEST,
                    true
                );

                return next(err);
            }

            const payload = {
                id: uniqid(),
                user: {
                    id: user.id,
                    role: user.role,
                },
            };

            const token = jwt.generateToken(payload);

            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (err) {
            return next(err);
        }
    }
}

export default AuthController;
