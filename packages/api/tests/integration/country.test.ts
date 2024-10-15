import request from 'supertest';
import mongoose from 'mongoose';
import { countryModel } from '@db/models/countries';
import { countries } from '@db/seeds/countries';
import { openDBConnection } from '@db/index';
import { mainApp } from '../../app';

describe('country route', () => {
  let app = mainApp.listen(0);

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await openDBConnection(false);
  });

  afterAll(() => {
    app.close();
  });

  it('should return country data', async () => {
    const country = new countryModel(countries[0]);
    await country.save();
    const res = await request(app).get(`/country/${country._id}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('country', country.country);
    expect(res.body.status).toBe('success');
  });

  it('should return bad request error', async () => {
    const res = await request(app).get('/country/1');
    expect(res.status).toBe(400);
    expect(res.body.data).toBe(null);
    expect(res.body.message).toBe('Bad Request');
    expect(res.body.status).toBe('error');
  });

  it('should return not found', async () => {
    const res = await request(app).get(`/country/${new mongoose.Types.ObjectId()}`);
    expect(res.status).toBe(404);
    expect(res.body.data).toBe(null);
    expect(res.body.message).toBe('Not Found');
    expect(res.body.status).toBe('error');
  });
});



