import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}


class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email }});

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }
    // user.password - Senha criptografada

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }
    // Usúario atentificado

    const token = sign({}, 'b976171513f681ccfdbbb929138d9f36', {
      subject: user.id,
      expiresIn: '1d',
    });// Criptografa mas não muito seguro

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
