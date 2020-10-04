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

    it('should not be able to authenticate with non existing user', async () => {
      const fakeUsersRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();
  
      const authenticateUser = new AuthenticateUserService(fakeUsersRepository, 
        fakeHashProvider,
      );
  
      const response = await authenticateUser.execute({
          email: 'jenny10@gmail.com',
          password: '123456', 
      });
  
      expect(authenticateUser.execute({
        email: 'jenny10@gmail.com',
        password: '123456', 
    })).rejects.toBeInstanceOf(AppError);
    });


it('should not be able to authenticate with wrong pssword', async () => {
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

  expect(await authenticateUser.execute({
    email: 'jenny10@gmail.com',
    password: 'wrong-password', 
    }),
  ).rejects.toBeInstanceOf(AppError);
  });
});