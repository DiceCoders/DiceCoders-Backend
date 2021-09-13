import { Inject } from '@nestjs/common';
import { generatePassword } from '@shared/utils/password';
import { CreateUserDTO } from '../Dto';
import { User } from '../infra/typeorm/entities/user.entity';
import { IUserRepository } from '../interfaces';

export class CreateUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}
  async execute({ email, name, password }: CreateUserDTO): Promise<User> {
    const newPassword = await generatePassword(password);
    return this.userRepository.create(email, name, newPassword);
  }
}
