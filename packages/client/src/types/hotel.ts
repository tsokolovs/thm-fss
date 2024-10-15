import { Hotel as APIHotel } from 'fss-models';

export type Hotel = Omit<APIHotel, '_id'> & { _id: string }