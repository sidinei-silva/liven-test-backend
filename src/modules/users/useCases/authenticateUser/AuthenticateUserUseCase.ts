import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import { IAuthenticateUserResponseDTO } from '@modules/users/dtos/IAuthenticateUserResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    const { expiresInToken, secretToken } = auth;

    if (!user) {
      throw new AppError('User not exists', 404);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email or Invalid password', 401);
    }

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
