import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '@modules/user/interfaces/iUserRepository';
import { User } from '../entities/user.entity';
import { DeleteUserDTO, UpdateUserDTO } from '@modules/user/Dto';

@Injectable()
export class UserRepository implements IUserRepository {
  @InjectRepository(User)
  private readonly ormRepository: Repository<User>;

  findOne(data: { email?: string; id?: string; name?: string }): Promise<User> {
    const user = this.ormRepository.findOne(data);

    return user;
  }

  create(email: string, name: string, password: string): Promise<User> {
    const user = this.ormRepository.create({
      email: email,
      name: name,
      password: password,
    });

    return this.ormRepository.save(user);
  }
  update(data: UpdateUserDTO): Promise<UpdateResult> {
    const user = this.ormRepository.update(data.id, data);

    return user;
  }
  delete(user: User): Promise<DeleteResult> {
    return this.ormRepository.delete(user);
  }
}
