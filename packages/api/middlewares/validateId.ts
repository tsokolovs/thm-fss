import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { ErrorType } from '@utils/error';

export async function validateIdMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!isValidObjectId(req.params.id)) {
    next(new Error(ErrorType.BadRequest));
  }
  next();
}

