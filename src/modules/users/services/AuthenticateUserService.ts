import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable} from 'tsyringe';

import AppError from '@shared/erros/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider : IHashProvider,
  ){}

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // user.password - Senha criptografada

    const passwordMatched = await this.hashProvider.compareHash(
      password, 
      user.password
    );

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination.');
    }
    // Usúario atentificado

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });// Criptografa mas não muito seguro

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
