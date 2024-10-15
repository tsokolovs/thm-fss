import request from 'supertest';
import { openDBConnection } from '@db/index';
import { hotelModel } from '@db/models/hotels';
import { hotels } from '@db/seeds/hotels';
import mongoose from 'mongoose';
import { mainApp } from '../../app';

describe('hotel route', () => {
  let app = mainApp.listen(0);

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await openDBConnection(false);
  });

  afterAll(() => {
    app.close();
  });

  it('should return hotel data', async () => {
    const hotel = new hotelModel(hotels[0]);
    await hotel.save();
    const res = await request(app).get(`/hotel/${hotel._id}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('hotel_name', hotel.hotel_name);
    expect(res.body.status).toBe('success');
  });

  it('should return bad request error', async () => {
    const res = await request(app).get('/hotel/1');
    expect(res.status).toBe(400);
    expect(res.body.data).toBe(null);
    expect(res.body.message).toBe('Bad Request');
    expect(res.body.status).toBe('error');
  });

  it('should return not found', async () => {
    const res = await request(app).get(`/hotel/${new mongoose.Types.ObjectId()}`);
    expect(res.status).toBe(404);
    expect(res.body.data).toBe(null);
    expect(res.body.message).toBe('Not Found');
    expect(res.body.status).toBe('error');
  });
});


