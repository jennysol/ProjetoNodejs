import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const userRepository = new UserRepository
  const createUser = new CreateUserService(userRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
  
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const userRepository = new UserRepository
    const updateUserAvatar = new UpdateUserAvatarService(userRepository);

      const user =  await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
