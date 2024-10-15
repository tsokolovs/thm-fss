import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { hotelRouter } from '@routes/hotel';
import { searchRouter } from '@routes/search';
import { countryRouter } from '@routes/country';
import { cityRouter } from '@routes/city';

const app = express();

app.use(cors());
app.use(express.json());

app.use(searchRouter);
app.use(hotelRouter);
app.use(countryRouter);
app.use(cityRouter);

app.get('/hotels', async (req, res) => {
  const mongoClient = new MongoClient(process.env.DATABASE_URL);
  console.log('Connecting to MongoDB...');

  try {
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB!');
    const db = mongoClient.db();
    const collection = db.collection('hotels');
    res.send(await collection.find().toArray());
  } finally {
    await mongoClient.close();
  }
});


app.use((req: Request, res: Response, next: NextFunction) => {
  next(); // TODO: not found error
});

export const mainApp = app;