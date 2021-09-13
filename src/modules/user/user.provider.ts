import { UserRepository } from './infra/typeorm/repositories/user.repository';
import { UserService } from './services';
import { CreateUserService } from './services/createUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { GetUserService } from './services/getUser.service';
import { UpdateUserService } from './services/updateUser.service';

const userServiceProvider = {
  provide: 'UserService',
  useClass: UserService,
};

const createUserServiceProvider = {
  provide: 'CreateUserService',
  useClass: CreateUserService,
};

const getUserServiceProvider = {
  provide: 'GetUserService',
  useClass: GetUserService,
};

const updateUserServiceProvider = {
  provide: 'UpdateUserService',
  useClass: UpdateUserService,
};
const deleteUserServiceProvider = {
  provide: 'DeleteUserService',
  useClass: DeleteUserService,
};
const userRepositoryProvider = {
  provide: 'IUserRepository',
  useClass: UserRepository,
};

export const UserProviders = [
  userServiceProvider,
  createUserServiceProvider,
  updateUserServiceProvider,
  deleteUserServiceProvider,
  userRepositoryProvider,
  getUserServiceProvider,
];
