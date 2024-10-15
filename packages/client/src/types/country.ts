import { Country as APICountry } from 'fss-models';

export type Country = Omit<APICountry, '_id'> & { _id: string }