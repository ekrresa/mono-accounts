import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export function validateSchema(schema: AnyZodObject) {
	return async function (req: Request, _res: Response, next: NextFunction) {
		await schema.parseAsync(req.body);
		next();
	};
}
