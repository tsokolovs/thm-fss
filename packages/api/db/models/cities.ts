import { model, Schema } from 'mongoose';
import { City } from 'fss-models';

const citySchema = new Schema<City>(
  {
    name: { type: String, index: true },
  }
);

export const cityModel = model('city', citySchema);

