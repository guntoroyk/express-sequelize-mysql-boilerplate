import express from 'express';
import authRouter from './auth.route';
import oAuthRouter from './oauth.route';
import userRouter from './user.route';
import orderRouter from './order.route';

const router = express.Router();

/** GET / - Check service health */
router.get('/', (req, res) => res.status(200).json({ message: 'OK' }));

router.use('/auth', authRouter);
router.use('/oauth', oAuthRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);

export default router;
