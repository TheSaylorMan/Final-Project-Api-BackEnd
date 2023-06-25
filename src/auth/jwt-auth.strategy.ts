import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JWTModel } from './models/jwt-model.dto';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '2aa5dc7e-83c5-4542-8bf5-de96bb96c7a9',
    });
  }

  async validate(payload: JWTModel): Promise<User> {
    const user = this.authenticationService.getUserByIdAsync(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
