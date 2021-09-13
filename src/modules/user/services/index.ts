import { Inject, Injectable } from '@nestjs/common';
import { CreateUserService } from './createUser.service';
import { UpdateUserService } from './updateUser.service';
import { DeleteUserService } from './deleteUser.service';
import { GetUserService } from './getUser.service';
import { User } from '../infra/typeorm/entities/user.entity';
import {
  CreateUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  UserTokenDTO,
} from '../Dto';
import { IUserService } from '../interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('CreateUserService')
    private readonly createUserService: CreateUserService,
    @Inject('GetUserService')
    private readonly getUserService: GetUserService,
    @Inject('UpdateUserService')
    private readonly updateUserService: UpdateUserService,
    @Inject('DeleteUserService')
    private readonly deleteUserService: DeleteUserService,
  ) {}
  createUser(data: CreateUserDTO): Promise<User> {
    return this.createUserService.execute(data);
  }
  getUser(
    data: { id?: string; email?: string },
    userTokenData?: UserTokenDTO,
  ): Promise<User> {
    return this.getUserService.execute(data, userTokenData);
  }
  updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData: UserTokenDTO,
  ): Promise<string> {
    return this.updateUserService.execute(updateUserData, userTokenData);
  }
  deleteUser(data: DeleteUserDTO): Promise<boolean> {
    return this.deleteUserService.execute(data);
  }
}
