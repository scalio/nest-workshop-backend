import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MigrationsModule } from './migrations/migrations.module';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { BuildingsModule } from './buildings/buildings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MigrationsModule,
    ResourcesModule,
    BuildingsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
