import { Component, Inject } from '@nestjs/common';
import { Authenticator } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { PASSPORT, JWT_OPTIONS } from './auth.constants';
import { JwtOptions } from './interfaces/jwt-options.interface';
import { UserPayload } from './interfaces/user-payload.interface';

@Component()
export class JwtStrategy extends Strategy {
  constructor(
    @Inject(JWT_OPTIONS) jwtOptions: JwtOptions,
    @Inject(PASSPORT) private readonly passport: Authenticator,
    private readonly authService: AuthService,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtOptions.secret,
      },
      async (payload, next) => await this.verify(payload, next),
    );
    this.passport.use(this);
  }

  async verify(payload: UserPayload, done) {
    const user = await this.authService.validateUserPayload(payload);
    if (!user) {
      return done('Unauthorized', false);
    }
    done(null, user);
  }
}
