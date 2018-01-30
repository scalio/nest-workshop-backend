import * as passport from 'passport';

import { PASSPORT, JWT_OPTIONS } from './auth.constants';
import { JwtOptions } from './interfaces/jwt-options.interface';

export const authProviders = [
  {
    provide: PASSPORT,
    useValue: passport,
  },
  {
    provide: JWT_OPTIONS,
    useValue: {
      expiresIn: 86400,
      secret: 'ngAtl-workshop',
    } as JwtOptions,
  },
];
