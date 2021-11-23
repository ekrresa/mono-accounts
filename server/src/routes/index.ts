import { Router } from 'express';
import userRouter from '../modules/user/user.routes';
import AccountRouter from '../modules/account/account.routes';

const router = Router();

router.get('/', (_req, res) => {
	res.status(200).send('Backend services running');
});

router.use('/accounts', AccountRouter);
router.use('/auth', userRouter);

export default router;
