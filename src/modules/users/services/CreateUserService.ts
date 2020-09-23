import { hash } from 'bcryptjs';

import AppError from '@shared/erros/AppError';
import IUserRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ name, email, password}: IRequest): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user =  await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });


    return user;
  }
}

export default CreateUserService;
