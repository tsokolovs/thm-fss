import { model, Schema } from 'mongoose';

const hotelSchema = new Schema(
  {
    chain_name: String,
    hotel_name: String,
    addressline1: String,
    addressline2: String,
    zipcode: String,
    city: String,
    state: String,
    country: String,
    countryisocode: String,
    star_rating: Number,
  }
);

export const hotelModel = model('hotel', hotelSchema);
