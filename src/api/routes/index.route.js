import express from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';

const router = express.Router();

/** GET / - Check service health */
router.get('/', (req, res) => res.status(200).json({ message: 'OK' }));

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
