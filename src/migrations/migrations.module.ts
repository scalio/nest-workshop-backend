import { Module } from '@nestjs/common';
import { migrationsProviders } from './migrations.providers';

@Module({
  components: [...migrationsProviders],
})
export class MigrationsModule {}
