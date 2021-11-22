import { UsersRepositoryInMemory } from '@modules/users/repositories/implementations/in-memory/UsersRepositoryInMemory';

import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const usersRepositoryInMemory = new UsersRepositoryInMemory();

const createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };
