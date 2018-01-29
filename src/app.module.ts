import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  components: [],
  controllers: [],
  exports: [],
})
export class AppModule {}
