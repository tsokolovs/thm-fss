import { model, Schema } from 'mongoose';

const citySchema = new Schema(
  {
    name: String,
  }
);

export const cityModel = model('city', citySchema);

