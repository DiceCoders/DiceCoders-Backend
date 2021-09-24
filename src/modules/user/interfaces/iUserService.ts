import { User } from '../infra/typeorm/entities/user.entity';
import {
  CreateUserDTO,
  UpdateUserDTO,
  DeleteUserDTO,
  UserTokenDTO,
} from '../Dto';

export abstract class IUserService {
  abstract createUser(data: CreateUserDTO): Promise<User>;
  abstract getUser(
    data: { id?: string; email?: string },
    userTokenData: UserTokenDTO,
  ): Promise<User>;
  abstract updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData?: UserTokenDTO,
  ): Promise<string>;
  abstract deleteUser(data: DeleteUserDTO): Promise<boolean>;
}
