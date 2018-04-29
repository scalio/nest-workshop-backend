import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from './entities/resource.entity';
import { ResourcesGateway } from './resources.gateway';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourceEntity]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService, ResourcesGateway],
})
export class ResourcesModule {}
