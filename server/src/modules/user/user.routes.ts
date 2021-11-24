import { Router } from 'express';
import * as UserControllers from './user.controllers';
import { LoginInputSchema, UserInputSchema } from './user.schema';
import { validateSchema } from '../../middleware/validation.middleware';

const router = Router({ mergeParams: true });

router.post('/login', validateSchema(LoginInputSchema), UserControllers.loginHandler);
router.post('/signup', validateSchema(UserInputSchema), UserControllers.signUpHandler);
// router.post('/forgotPassword', (req, res) => {});
// router.post('/resetPassword', (req, res) => {});

export default router;
