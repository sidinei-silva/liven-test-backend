import { container } from 'tsyringe';

import { UsersRepositoryInMemory } from '@modules/users/repositories/implementations/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepositoryInMemory,
);
