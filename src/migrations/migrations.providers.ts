import { Connection } from 'typeorm';

export const migrationsProviders = [
  {
    provide: 'MIGRATIONS_TOKEN',
    useFactory: async (connection: Connection) =>
      await connection.runMigrations(),
    inject: [Connection],
  },
];
