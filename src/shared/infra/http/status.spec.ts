import request from 'supertest';
import { Connection } from 'typeorm';

import { typeOrmCreateConnection } from '../typeorm';
import { app } from './app';

let connection: Connection;

describe('Check status api', () => {
  beforeAll(async () => {
    connection = await typeOrmCreateConnection('test');
    await connection.runMigrations();
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    await connection.close();
  });
  test('should return 200', async () => {
    await request(app).get('/v1/status').expect(200);
  });
});
