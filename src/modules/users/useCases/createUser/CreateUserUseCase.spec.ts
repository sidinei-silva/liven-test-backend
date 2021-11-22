import { UsersRepositoryInMemory } from '@modules/users/repositories/implementations/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;

describe('Create User Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Sidinei Silva',
      email: 'sidinei.silva02@gmail.com',
      password: '123456',
    });

    expect(user).toBeDefined();
    expect(user).toHaveProperty('id');
  });
});
