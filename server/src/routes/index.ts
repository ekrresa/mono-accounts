import { Router } from 'express';
import userRouter from '../modules/user/user.routes';

const router = Router();

router.get('/', (_req, res) => {
	res.status(200).send('Backend services running');
});

router.use('/auth', userRouter);

export default router;
