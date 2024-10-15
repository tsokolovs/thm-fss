import { model, Schema } from 'mongoose';

const countrySchema = new Schema(
  {
    country: { type: String, index: true },
    countryisocode: String,
  }
);

export const countryModel = model('country', countrySchema);
