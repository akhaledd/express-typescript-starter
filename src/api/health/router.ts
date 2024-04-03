import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  return res.status(StatusCodes.OK).send('Service is healthy');
});

export default router;
