import { Authenticator } from 'passport';
import {
  Module,
  MiddlewaresConsumer,
  NestModule,
  Inject,
} from '@nestjs/common';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { authProviders } from './auth.providers';
import { PASSPORT } from './auth.constants';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { MeController } from '../users/me.controller';

@Module({
  imports: [CryptoModule, UsersModule],
  components: [JwtStrategy, AuthService, ...authProviders],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  constructor(@Inject(PASSPORT) private readonly passport: Authenticator) {}

  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(this.passport.authenticate('jwt', { session: false }))
      .forRoutes(MeController);
  }
}
