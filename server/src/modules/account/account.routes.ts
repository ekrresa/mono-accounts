import { Router } from 'express';
import * as AccountControllers from './account.controllers';
import { ensureUserIsAuthenticated } from '../../middleware/auth.middleware';
import {
	validateQueryParams,
	validateReqParams,
	validateSchema,
} from '../../middleware/validation.middleware';
import {
	AccountIdSchema,
	AccountInputSchema,
	TransactionsQuerySchema,
	UserIdSchema,
} from './account.schema';

const router = Router({ mergeParams: true });

router.get(
	'/:account_id/transactions',
	[
		ensureUserIsAuthenticated,
		validateReqParams(AccountIdSchema),
		//@ts-expect-error
		validateQueryParams(TransactionsQuerySchema),
	],
	AccountControllers.getAccountTransactionsHandler
);

router.get(
	'/user/:user_id',
	[ensureUserIsAuthenticated, validateReqParams(UserIdSchema)],
	AccountControllers.getUserAccountsHandler
);

router.delete(
	'/:account_id',
	[ensureUserIsAuthenticated, validateReqParams(AccountIdSchema)],
	AccountControllers.unlinkAccountHandler
);

router.post(
	'/link',
	[ensureUserIsAuthenticated, validateSchema(AccountInputSchema)],
	AccountControllers.linkAccountHandler
);

export default router;
