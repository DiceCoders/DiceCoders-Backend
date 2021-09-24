import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserResolver } from './infra/graphql/user.resolver';
import { User } from './infra/typeorm/entities/user.entity';
import { UserRepository } from './infra/typeorm/repositories/user.repository';
import { UserService } from './services';
import { IUserRepository, IUserService } from './interfaces';

const userServiceProvider = {
  provide: IUserService,
  useClass: UserService,
};

const userRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository,
};
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [userServiceProvider, userRepositoryProvider, UserResolver],
  exports: [userServiceProvider, userRepositoryProvider],
})
export class UserModule {}
