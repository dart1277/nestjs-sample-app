import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { repoProviders } from './repo.providers';

@Module({
  providers: [...databaseProviders, ...repoProviders],
  exports: [...databaseProviders, ...repoProviders],
})
export class DatabaseModule {}
