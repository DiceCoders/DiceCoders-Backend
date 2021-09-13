import { Inject } from '@nestjs/common';
import { UserTokenDTO } from '../Dto';
import { User } from '../infra/typeorm/entities/user.entity';
import { IUserRepository } from '../interfaces';

export class GetUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  execute(
    data: { id?: string; email?: string },
    userTokenData?: UserTokenDTO,
  ): Promise<User> {
    const queryData = userTokenData
      ? { id: userTokenData.id, email: userTokenData.email }
      : data;

    return this.userRepository.findOne(queryData);
  }
}
