import { Router } from 'express';
import { validateSchema } from '../../utils/middleware';
import * as UserControllers from './user.controllers';
import { UserInputSchema } from './user.schema';

const router = Router({ mergeParams: true });

// router.post('/login', (req, res) => {});
router.post('/signup', validateSchema(UserInputSchema), UserControllers.signUpHandler);
// router.post('/forgotPassword', (req, res) => {});
// router.post('/resetPassword', (req, res) => {});

export default router;
