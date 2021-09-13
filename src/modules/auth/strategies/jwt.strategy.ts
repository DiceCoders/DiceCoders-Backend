import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@modules/user/infra/typeorm/entities/user.entity';
import { GetUserService } from '@modules/user/services/getUser.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: GetUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  validate(validationPayload: { id: string; email: string }): Promise<User> {
    return this.usersService.execute({
      id: validationPayload.id,
      email: validationPayload.email,
    });
  }
}
