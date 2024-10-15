import request from 'supertest';
import { openDBConnection } from '@db/index';
import { searchCache } from '@utils/searchCache';
import { mainApp } from '../../app';

describe('search route', () => {
  let app = mainApp.listen(0);

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    // Author-comment: by default will seed the database
    await openDBConnection();
  });

  afterAll(() => {
    app.close();
  });


  it('should return empty results', async () => {
    const response = await request(app).get('/search/foo');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.data.hotels).toHaveLength(0);
    expect(response.body.data.countries).toHaveLength(0);
    expect(response.body.data.cities).toHaveLength(0);
  });

  it('should return results', async () => {
    const response = await request(app).get('/search/uni');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body.data.hotels).toHaveLength(8);
    expect(response.body.data.countries).toHaveLength(2);
    expect(response.body.data.cities).toHaveLength(0);
  });

  it('should cache the results', async () => {
    const response = await request(app).get('/search/uni');

    expect(JSON.stringify(searchCache.uni.value)).toBe(JSON.stringify(response.body.data));
    expect(searchCache.uni.expiresAt).toBeGreaterThan(Date.now());
  });
});


