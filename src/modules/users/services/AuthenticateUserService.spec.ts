import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AthenticateUser', () => {
  it('should be able to create a new appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, 
      fakeHashProvider,
    );

    const user = await createUser.execute({
        name: 'Jennie',
        email: 'jenny10@gmail.com',
        password: '123456', 
    });

    const response = await authenticateUser.execute({
        email: 'jenny10@gmail.com',
        password: '123456', 
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });
});