import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { CryptoService } from '../crypto/crypto.service';
import { UserPayload } from './interfaces/user-payload.interface';
import { JWT_OPTIONS } from './auth.constants';
import { JwtOptions } from './interfaces/jwt-options.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_OPTIONS) private readonly jwtOptions: JwtOptions,
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
  ) {}

  async createToken(loginUserDto: LoginUserDto) {
    const { id, username } = await this.validateLoginUserDto(loginUserDto);
    const { expiresIn, secret } = this.jwtOptions;

    const token = jwt.sign({ id, username }, secret, {
      expiresIn,
    });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateLoginUserDto(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { password, username } = loginUserDto;
    const user = await this.usersService.findOne({ username });
    const isValid = await this.cryptoService.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateUserPayload(payload: UserPayload): Promise<UserEntity> {
    const { username, id } = payload;
    try {
      const user = await this.usersService.findOne({ id });
      return user.username === username ? user : null;
    } catch {
      return null;
    }
  }

  validateToken(token: string): UserPayload {
    try {
      return jwt.verify(token, this.jwtOptions.secret) as UserPayload;
    } catch {
      return null;
    }
  }
}
