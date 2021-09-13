import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { generatePassword } from '@shared/utils/password';
import { UpdateUserDTO, UserTokenDTO } from '../Dto';
import { IUserRepository } from '../interfaces';

export class UpdateUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}
  async execute(
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
    const newPassword = updateUserData.password
      ? await generatePassword(updateUserData.password)
      : user.password;
    const data = Object.assign(user, {
      ...updateUserData,
      password: newPassword,
    });

    await this.userRepository.update(data);
    return 'Usuário atualizado';
  }
}
