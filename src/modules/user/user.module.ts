import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserProviders } from './user.provider';
import { UserResolver } from './infra/graphql/user.resolver';
import { User } from './infra/typeorm/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...UserProviders, UserResolver],
  exports: [...UserProviders],
})
export class UserModule {}
