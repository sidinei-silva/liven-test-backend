import request from 'supertest';
import { Connection } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { app } from '@shared/infra/http/app';
import { typeOrmCreateConnection } from '@shared/infra/typeorm';

let connection: Connection;

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    connection = await typeOrmCreateConnection('test');
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to authenticate', async () => {
    const user: ICreateUserDTO = {
      name: 'Sidinei Silva',
      email: 'sidinei.silva02@gmail.com',
      password: '123456',
    };

    await request(app).post('/v1/users').send({
      email: user.email,
      name: user.name,
      password: user.password,
    });

    const response = await request(app).post('/v1/users/authenticate').send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      data: {
        user: {
          email: 'sidinei.silva02@gmail.com',
          name: 'Sidinei Silva',
        },
      },
    });
    expect(response.body.data).toHaveProperty('token');
  });
});
