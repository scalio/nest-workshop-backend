import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './utils/user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('me')
export class MeController {
  @Get()
  findMe(@User() user: UserEntity): UserEntity {
    return user;
  }
}
 