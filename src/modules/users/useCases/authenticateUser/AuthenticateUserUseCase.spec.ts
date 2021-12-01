import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/users/repositories/implementations/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate', async () => {
    const user: ICreateUserDTO = {
      name: 'Sidinei Silva',
      email: 'sidinei.silva02@gmail.com',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toMatchObject({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'sidinei.silva02@gmail.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('User not exists', 404));
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user: ICreateUserDTO = {
      name: 'Sidinei Silva',
      email: 'sidinei.silva02@gmail.com',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: '654321',
      }),
    ).rejects.toEqual(new AppError('Email or Invalid password', 401));
  });
});
