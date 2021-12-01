import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password }: IAuthenticateUserDTO = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticateResponse = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(201).json({ data: authenticateResponse });
  }
}
