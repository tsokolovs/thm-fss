import { model, Schema } from 'mongoose';
import { Hotel } from 'fss-models';

const hotelSchema = new Schema<Hotel>(
  {
    chain_name: String,
    hotel_name: { type: String, index: true },
    addressline1: String,
    addressline2: String,
    zipcode: String,
    city: String,
    state: String,
    country: { type: String, index: true },
    countryisocode: String,
    star_rating: Number,
  }
);

export const hotelModel = model('hotel', hotelSchema);
