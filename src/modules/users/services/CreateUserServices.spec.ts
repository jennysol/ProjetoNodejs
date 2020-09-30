import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new appointment', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUserRepository,
    );

    const user = await createUser.execute({
        name: 'Jennifer',
        email: 'jenny@gmail.com',
        password: '123456', 
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUserRepository,
    );

    await createUser.execute({
        name: 'Jennifer',
        email: 'jenny@gmail.com',
        password: '123456', 
    });

    expect(createUser.execute({
        name: 'Jennifer',
        email: 'jenny@gmail.com',
        password: '123456', 
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});