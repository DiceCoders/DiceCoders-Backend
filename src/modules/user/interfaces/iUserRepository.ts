import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from '../Dto';
import { User } from '../infra/typeorm/entities/user.entity';

export interface IUserRepository {
  create(email: string, name: string, password: string): Promise<User>;
  update(data: UpdateUserDTO): Promise<UpdateResult>;
  delete(id: string): Promise<DeleteResult>;
  findOne(data: { email?: string; id?: string; name?: string }): Promise<User>;
}
