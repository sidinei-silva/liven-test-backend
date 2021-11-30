import { container } from 'tsyringe';

import { UsersRepositoryTypeorm } from '@modules/users/repositories/implementations/typeorm/UsersRepositoryTypeorm';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepositoryTypeorm,
);
