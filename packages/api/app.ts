import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { hotelRouter } from '@routes/hotel';
import { searchRouter } from '@routes/search';
import { countryRouter } from '@routes/country';
import { cityRouter } from '@routes/city';
import { hotelModel } from '@db/models/hotels';

const app = express();

app.use(cors());
app.use(express.json());

app.use(searchRouter);
app.use(hotelRouter);
app.use(countryRouter);
app.use(cityRouter);

app.get('/hotels', async (req, res) => {
  res.send(await hotelModel.find());
});


app.use((req: Request, res: Response, next: NextFunction) => {
  next(); // TODO: not found error
});

export const mainApp = app;