import express, { NextFunction, Request, Response } from 'express';
import { successResponse } from '@utils/response';
import { searchCacheMiddleware } from '@middlewares/searchCache';
import { ErrorType } from '@utils/error';
import { hotelModel } from '@db/models/hotels';
import { searchCache } from '@utils/searchCache';

const router = express.Router();

router.get(
  '/search/:searchTerm',
  searchCacheMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    const rawSearchTerm = req.params.searchTerm.toLowerCase();
    const searchTerm = { $regex: rawSearchTerm, $options: 'i' };
    try {
      const result = await hotelModel.aggregate([
        {
          $match: {
            $or: [{ hotel_name: searchTerm }, { country: searchTerm }]
          }
        },
        { $sort: { hotel_name: 1 } },
        { $project: { _id: 1, hotel_name: 1, country: 1 } },
        { $addFields: { __collection__: 'hotels' } },
        {
          $unionWith: {
            coll: 'countries',
            pipeline: [
              { $match: { country: searchTerm } },
              { $sort: { country: 1 } },
              { $project: { _id: 1, country: 1 } },
              { $addFields: { __collection__: 'countries' } },
            ],
          },
        },
        {
          $unionWith: {
            coll: 'cities',
            pipeline: [
              { $match: { name: searchTerm } },
              { $sort: { name: 1 } },
              { $project: { _id: 1, name: 1 } },
              { $addFields: { __collection__: 'cities' } },
            ],
          },
        },
      ]);

      // Author-comment: Do search result grouping within query and not after it,
      // I did not want to spend too much time remembering/figuring out how to do it
      const groupedResults = result.reduce((acc, val) => {
        const { __collection__, ...rest } = val;
        acc[__collection__].push(rest);
        return acc;
      }, { hotels: [], countries: [], cities: [] });

      const expiresAt = Date.now() + 1000 * 60 * 5; // 5 minutes later
      searchCache[rawSearchTerm] = { value: groupedResults, expiresAt };
      res.status(200).send(successResponse(groupedResults));
    } catch (e: any) {
      next(new Error(ErrorType.ServerError));
      return;
    }
  }
);

export const searchRouter = router;

