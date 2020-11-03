import express from 'express';
import { validate } from 'express-validation';

import paramValidation from '~/config/param-validation';
import AuthController from '~/api/controllers/auth.controller';

const router = express.Router();

router.post(
    '/login',
    validate(paramValidation.authLogin),
    AuthController.login
);

export default router;
