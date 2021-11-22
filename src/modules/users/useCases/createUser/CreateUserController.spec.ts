import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create User Controller', () => {
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
