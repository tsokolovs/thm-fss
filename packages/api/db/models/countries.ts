import { model, Schema } from 'mongoose';

const countrySchema = new Schema(
  {
    country: String,
    countryisocode: String,
  }
);

export const countryModel = model('country', countrySchema);
