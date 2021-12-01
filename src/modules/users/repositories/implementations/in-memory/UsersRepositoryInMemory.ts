import { User } from '@modules/users/domain/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { IUsersRepository } from '../../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { email, name, password });
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
}

export { UsersRepositoryInMemory };
