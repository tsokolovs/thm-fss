import { NextFunction, Request, Response } from 'express';
import { successResponse } from '@utils/response';
import { searchCache } from '@utils/searchCache';

// Author-comment: In real app this would be replaced by redis or
export async function searchCacheMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const searchTerm = req.params.searchTerm;
  const { value, expiresAt } = searchCache[searchTerm] ?? {};

  if (!value || expiresAt < Date.now()) {
    next();
    return;
  }

  res.status(200).send(successResponse(value));
}
