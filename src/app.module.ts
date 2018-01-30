import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { BuildingsModule } from './buildings/buildings.module';
import { MigrationsModule } from './migrations/migrations.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    ResourcesModule,
    BuildingsModule,
    MigrationsModule,
  ],
  components: [],
  controllers: [],
  exports: [],
})
export class AppModule {}
