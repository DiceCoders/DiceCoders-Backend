import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from '../Dto';
import { User } from '../infra/typeorm/entities/user.entity';

export abstract class IUserRepository {
  abstract create(email: string, name: string, password: string): Promise<User>;
  abstract update(data: UpdateUserDTO): Promise<UpdateResult>;
  abstract delete(data: User): Promise<DeleteResult>;
  abstract findOne(data: {
    email?: string;
    id?: string;
    name?: string;
  }): Promise<User>;
}
