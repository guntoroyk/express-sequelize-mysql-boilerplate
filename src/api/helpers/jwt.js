import jwt from 'jsonwebtoken';
import config from '~/config/config';

function generateToken(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
}

function verifyToken(token) {
    return jwt.verify(token, config.jwtSecret);
}
export default {
    generateToken,
    verifyToken,
};
