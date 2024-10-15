import { model, Schema } from 'mongoose';

const citySchema = new Schema(
  {
    name: { type: String, index: true },
  }
);

export const cityModel = model('city', citySchema);

