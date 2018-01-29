import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DynamicModule } from '@nestjs/common/interfaces';
import { USERS_TOKEN } from './users.constants';

@Module({
  controllers: [UsersController],
  components: [UsersService],
})
export class UsersModule {}
