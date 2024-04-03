import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthRouter } from '@/api/health';
import { env } from '@/config/env';
import errorHandler from '@/middleware/errorHandler';
import rateLimiter from '@/middleware/rateLimiter';
import requestLogger from '@/middleware/requestLogger';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger());

app.use('/health', healthRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
