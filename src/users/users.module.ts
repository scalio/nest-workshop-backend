import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CryptoModule } from '../crypto/crypto.module';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { BuildingsModule } from '../buildings/buildings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CryptoModule,
    BuildingsModule,
  ],
  controllers: [UsersController, MeController],
  components: [UsersService, MeService],
  exports: [UsersService],
})
export class UsersModule {}
