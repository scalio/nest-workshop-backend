import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DynamicModule } from '@nestjs/common/interfaces';
import { USERS_TOKEN } from './users.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CryptoModule],
  controllers: [UsersController],
  components: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
