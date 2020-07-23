import express from 'express';
import UserController from '~/api/controllers/user.controller';
import auth from '~/api/middlewares/authentication';

const router = express.Router();

// router.use(auth.authenticate);

router.get('/', UserController.index);

export default router;
