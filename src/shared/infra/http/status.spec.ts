import request from 'supertest';

import { app } from './app';

describe('Check status api', () => {
  test('should return 200', async () => {
    await request(app).get('/v1/status').expect(200);
  });
});
