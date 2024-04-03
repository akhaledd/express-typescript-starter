import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import cookieParser from 'cookie-parser';

// import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
// import { userRouter } from '@/api/user/userRouter';
// import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/middleware/errorHandler';
import rateLimiter from '@/middleware/rateLimiter';
import { env } from '@/config/env';
import requestLogger from '@/middleware/requestLogger';

const logger = pino({ name: 'server start' });
const app: Express = express();

// // Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger());

// // Routes
// app.use('/health-check', healthCheckRouter);
// app.use('/users', userRouter);

// // Swagger UI
// app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
