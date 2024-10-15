import { NextFunction, Request, Response } from 'express';
import { ErrorType } from '@utils/error';

export function errorMiddleware(
  { message }: { message: ErrorType },
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Error:', message);
  switch (message) {
    case ErrorType.BadRequest:
      return res.status(400).send({ data: null, status: 'error', message });
    case ErrorType.NotFound:
      return res.status(404).send({ data: null, status: 'error', message });
    case ErrorType.ServerError:
    default:
      return res.status(500).send({ data: null, status: 'error', message });
  }
}
