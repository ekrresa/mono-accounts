import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import pinoHttp from 'pino-http';
import createHttpError from 'http-errors';

import { ErrorHandler } from './config/error';
import { logger } from './config/logger';
import { env } from './config/env';
import ApiRouter from './routes';

const app = express();
const loggerMiddleware = pinoHttp({ logger, useLevel: 'http' });

if (env.NODE_ENV === 'production') {
	app.set('trust proxy', 1);
}

app.use(cors());

app.use(helmet());
app.use(loggerMiddleware);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (_req, res, next) {
	res.set('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
	next();
});

app.use('/api', ApiRouter);

app.use((_req, _res, next) => {
	next(createHttpError(404, { message: 'Resource not found' }));
});

app.use(ErrorHandler);

export default app;
