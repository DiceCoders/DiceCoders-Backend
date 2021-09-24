import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../infra/typeorm/entities/user.entity';
import {
  CreateUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  UserTokenDTO,
} from '../Dto';
import { IUserRepository, IUserService } from '../interfaces';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async createUser({ email, name, password }: CreateUserDTO): Promise<User> {
    return this.userRepository.create(email, name, password);
  }
  async getUser(
    data: { id?: string; email?: string },
    userTokenData?: UserTokenDTO,
  ): Promise<User> {
    const queryData = userTokenData
      ? { id: userTokenData.id, email: userTokenData.email }
      : data;

    return this.userRepository.findOne(queryData);
  }
  async updateUser(
    updateUserData: UpdateUserDTO,
    userTokenData: UserTokenDTO,
  ): Promise<string> {
    if (updateUserData.id !== userTokenData.id) {
      throw new UnauthorizedException('Unauthorized user');
    }
    const user = await this.userRepository.findOne({ id: userTokenData.id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const data = Object.assign(user, updateUserData);

    await this.userRepository.update(data);
    return 'Usuário atualizado';
  }
  async deleteUser(data: DeleteUserDTO): Promise<boolean> {
    const user = await this.userRepository.findOne(data);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deleteResult = await this.userRepository.delete(data.id);
    return deleteResult.affected > 0;
  }
}
