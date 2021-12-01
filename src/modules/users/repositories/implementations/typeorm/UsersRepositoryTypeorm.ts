import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/users/domain/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';

import { IUsersRepository } from '../../IUsersRepository';

export class UsersRepositoryTypeorm implements IUsersRepository {
  private repository: Repository<UserEntity>;
  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async create({ email, name, password, id }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      id,
    });

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}
