import { model, Schema } from 'mongoose';
import { Country } from 'fss-models';

const countrySchema = new Schema<Country>(
  {
    country: { type: String, index: true },
    countryisocode: String,
  }
);

export const countryModel = model('country', countrySchema);
