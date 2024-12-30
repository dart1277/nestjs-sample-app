import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './messages/model/user.entity';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

/* istanbul ignore file */
@Module({
  imports: [
    MessagesModule,
    TypeOrmModule.forRootAsync({
      useFactory() {
        // https://orkhan.gitbook.io/typeorm/docs/logging
        return {
          // type: 'postgres',
          type: 'sqlite',
          database: 'db.sqlite',
          synchronize: true,
          entities: [User],
          //autoLoadEntities: true,
          // logging: true,
          logging: 'all',
          logger: 'advanced-console',
          //logger: 'file',
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
