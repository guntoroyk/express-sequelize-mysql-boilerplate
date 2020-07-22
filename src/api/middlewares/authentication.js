import passport from 'passport';
import httpStatus from 'http-status';
import APIError from '~/api/helpers/APIError';

const handleJwt = (req, res, next) => (err, user, info) => {
    const error = err;
    const apiError = new APIError(
        error ? error.message : 'Unauthorized',
        httpStatus.UNAUTHORIZED,
        error ? error.stack : undefined
    );

    if (err) return next(err);

    if (user) {
        req.authenticated = true;
        req.user = user;
        req.role = user.role;
        req.info = info;
        return next();
    }
    req.authenticated = false;

    return next(apiError);
};

const authorize = (roles) => {
    const submittedRoles = roles.split(',');
    const acceptedRoles = [];

    submittedRoles.forEach((role) => {
        if (role === 'admin' || role === 'user') {
            acceptedRoles.push(role);
        }
    });

    return async (req, res, next) => {
        const { role } = req;
        let apiError = new APIError(
            'Role not allowed',
            httpStatus.UNAUTHORIZED,
            true
        );
        if (!acceptedRoles.includes(role)) {
            return next(apiError);
        }
        return next();
    };
};

export default {
    authenticate: (req, res, next) =>
        passport.authenticate(
            'jwt',
            { session: false },
            handleJwt(req, res, next)
        )(req, res, next),
    authorize,
};
