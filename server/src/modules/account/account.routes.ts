import { Router } from 'express';
import * as AccountControllers from './account.controllers';
import { ensureUserIsAuthenticated } from '../../middleware/auth.middleware';
import { validateReqParams, validateSchema } from '../../middleware/validation.middleware';
import { AccountInputSchema, userIdSchema } from './account.schema';

const router = Router({ mergeParams: true });

router.get(
	'/user/:user_id',
	[ensureUserIsAuthenticated, validateReqParams(userIdSchema)],
	AccountControllers.getUserAccountsHandler
);

router.post(
	'/link',
	[ensureUserIsAuthenticated, validateSchema(AccountInputSchema)],
	AccountControllers.linkAccountHandler
);

export default router;
