import mongoose from 'mongoose';
import { countries } from './seeds/countries';
import { countryModel } from './models/countries';
import { hotelModel } from './models/hotels';
import { hotels } from './seeds/hotels';
import { cityModel } from './models/cities';
import { cities } from './seeds/cities';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const openDBConnection = async (seed = true) => {
  const mongoServer = await MongoMemoryServer.create();
  process.env.DATABASE_URL = mongoServer.getUri();

  try {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
    await mongoose.connect(process.env.DATABASE_URL, {});
    if (seed) {
      await hotelModel.insertMany(hotels);
      await cityModel.insertMany(cities);
      await countryModel.insertMany(countries);
    }
  } catch (e: any) {
    console.log('Error:', e);
  }
};
