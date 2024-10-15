import { City as APICity } from 'fss-models';

export type City = Omit<APICity, '_id'> & { _id: string }