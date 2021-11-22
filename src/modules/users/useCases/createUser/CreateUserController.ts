import { Request, Response } from 'express';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password }: ICreateUserDTO = request.body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return response.status(201).json({ data: user });
  }
}
