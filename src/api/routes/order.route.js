import express from 'express';
import OrderController from '~/api/controllers/order.controller';
import auth from '~/api/middlewares/authentication';

const router = express.Router();

router.use(auth.authenticate);
router.use(auth.authorize('admin'));

router.get('/', OrderController.index);

export default router;
