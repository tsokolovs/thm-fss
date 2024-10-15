import request from 'supertest';
import { openDBConnection } from '@db/index';
import mongoose from 'mongoose';
import { cityModel } from '@db/models/cities';
import { cities } from '@db/seeds/cities';
import { mainApp } from '../../app';

describe('city route', () => {
  let app = mainApp.listen(0);

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await openDBConnection(false);
  });

  afterAll(() => {
    app.close();
  });

  it('should return city data', async () => {
    const city = new cityModel(cities[0]);
    await city.save();
    const res = await request(app).get(`/city/${city._id}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('name', city.name);
    expect(res.body.status).toBe('success');
  });

  it('should return bad request error', async () => {
    const res = await request(app).get('/city/1');
    expect(res.status).toBe(400);
    expect(res.body.data).toBe(null);
    expect(res.body.message).toBe('Bad Request');
    expect(res.body.status).toBe('error');
  });

  it('should return not found', async () => {
    const res = await request(app).get(`/city/${new mongoose.Types.ObjectId()}`);
    expect(res.status).toBe(404);
    expect(res.body.data).toBe(null);
    expect(res.body.message).toBe('Not Found');
    expect(res.body.status).toBe('error');
  });
});


