import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { hotelRouter } from '@routes/hotel';
import { searchRouter } from '@routes/search';
import { countryRouter } from '@routes/country';
import { cityRouter } from '@routes/city';
import { errorMiddleware } from '@middlewares/error';
import { ErrorType } from '@utils/error';

const app = express();

app.use(cors());
app.use(express.json());

app.use(searchRouter);
app.use(hotelRouter);
app.use(countryRouter);
app.use(cityRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new Error(ErrorType.NotFound));
});

app.use(errorMiddleware);

export const mainApp = app;