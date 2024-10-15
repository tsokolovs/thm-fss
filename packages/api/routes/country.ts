import express, { NextFunction, Request, Response } from 'express';
import { validateIdMiddleware } from '@middlewares/validateId';
import { successResponse } from '@utils/response';
import { ErrorType } from '@utils/error';
import { countryModel } from '@db/models/countries';

const router = express.Router();

router.get(
  '/country/:id',
  validateIdMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const country = await countryModel.findById(req.params.id);

      if (!country) {
        next(new Error(ErrorType.NotFound));
        return;
      }

      res.status(200).send(successResponse(country));
    } catch (e: any) {
      next(new Error(ErrorType.ServerError));
      return;
    }
  }
);

export const countryRouter = router;
