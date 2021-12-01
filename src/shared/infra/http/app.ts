import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import '@shared/infra/container';

import { typeOrmCreateConnection } from '@shared/infra/typeorm/index';

import { AppError } from '../../errors/AppError';
import morganMiddleware from './middlewares/morganMiddleware';
import { router } from './routes';

typeOrmCreateConnection('default');
const app = express();

app.use(express.json());

app.use(cors());
app.use(morganMiddleware);
app.use('/v1', router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
