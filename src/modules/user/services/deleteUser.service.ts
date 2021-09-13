import { Inject, NotFoundException } from '@nestjs/common';
import { DeleteUserDTO } from '../Dto/DeleteUserDTO';
import { IUserRepository } from '../interfaces';

export class DeleteUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}
  async execute(data: DeleteUserDTO): Promise<boolean> {
    const user = await this.userRepository.findOne(data);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deleteResult = await this.userRepository.delete(data.id);
    return deleteResult.affected > 0;
  }
}
