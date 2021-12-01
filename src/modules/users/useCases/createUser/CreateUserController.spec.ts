import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import { typeOrmCreateConnection } from '@shared/infra/typeorm';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await typeOrmCreateConnection('test');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new User', async () => {
    const response = await request(app).post('/v1/users').send({
      email: 'sidinei.silva02@gmail.com',
      name: 'Sidinei Silva',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      data: {
        email: 'sidinei.silva02@gmail.com',
        name: 'Sidinei Silva',
      },
    });
  });
});
