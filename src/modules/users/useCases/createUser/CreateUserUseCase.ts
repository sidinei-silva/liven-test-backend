import { hash } from 'bcrypt';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: ICreateUserDTO) {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('User already exists', 400);
    }

    const passwordHashed = await hash(password, 8);

    return this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });
  }
}

export { CreateUserUseCase };
