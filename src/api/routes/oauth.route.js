import express from 'express';
import OauthController from '~/api/controllers/oauth.controller';

const router = express.Router();

router.post(
    '/token',
    OauthController.handle
);

export default router;
