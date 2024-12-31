import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CurrentUserInterceptor } from './messages/app/currentuser/current-user.interceptor';
import { AuthMiddleware } from './messages/app/auth/auth.middleware';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { MainExceptionFilter } from "./messages/app/exceptions/main-exception.filter";

/* istanbul ignore file */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MessagesModule,
    /*    TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory(config: ConfigService) {
            // https://orkhan.gitbook.io/typeorm/docs/logging
            return {
              type: 'postgres',
              database: config.get<string>('DB_NAME') || 'msg',
              schema: 'web',
              port: 5432,
              host: 'localhost',
              username: 'cx',
              password: 'okok',
              //type: 'sqlite',
              //database: 'db.sqlite',
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
        }),*/
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: MainExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  // global middleware is applied in main.ts using app.use(...)

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      //.exclude({ path: 'messages', method: RequestMethod.GET })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
