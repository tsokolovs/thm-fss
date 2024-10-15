import express, { NextFunction, Request, Response } from 'express';
import { validateIdMiddleware } from '@middlewares/validateId';
import { successResponse } from '@utils/response';
import { ErrorType } from '@utils/error';
import { cityModel } from '@db/models/cities';

const router = express.Router();

router.get(
  '/city/:id',
  validateIdMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const city = await cityModel.findById(req.params.id);

      if (!city) {
        next(new Error(ErrorType.NotFound));
        return;
      }

      res.status(200).send(successResponse(city));
    } catch (e: any) {
      next(new Error(ErrorType.ServerError));
      return;
    }
  }
);

export const cityRouter = router;
