import express, { NextFunction, Request, Response } from 'express';
import { validateIdMiddleware } from '@middlewares/validateId';
import { successResponse } from '@utils/response';
import { ErrorType } from '@utils/error';
import { hotelModel } from '@db/models/hotels';

const router = express.Router();

router.get(
  '/hotel/:id',
  validateIdMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hotel = await hotelModel.findById(req.params.id);

      if (!hotel) {
        next(new Error(ErrorType.NotFound));
        return;
      }

      res.status(200).send(successResponse(hotel));
    } catch (e: any) {
      next(new Error(ErrorType.ServerError));
      return;
    }
  }
);

export const hotelRouter = router;
