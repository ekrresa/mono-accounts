import { Router } from 'express';
import * as UserControllers from './user.controllers';
import { LoginInputSchema, UserInputSchema, UserIdSchema } from './user.schema';
import { ensureUserAuthority, ensureUserIsAuthenticated } from '../../middleware/auth.middleware';
import { validateReqParams, validateSchema } from '../../middleware/validation.middleware';

const router = Router({ mergeParams: true });

router.post('/login', validateSchema(LoginInputSchema), UserControllers.loginHandler);
router.post('/signup', validateSchema(UserInputSchema), UserControllers.signUpHandler);
router.delete(
	'/delete',
	[ensureUserIsAuthenticated, ensureUserAuthority, validateReqParams(UserIdSchema)],
	UserControllers.deleteUserHandler
);
// router.post('/forgotPassword', (req, res) => {});
// router.post('/resetPassword', (req, res) => {});

export default router;
