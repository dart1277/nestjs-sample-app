import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository, IMessagesRepository } from './messages.repository';
import { RawMessagesModule } from './raw-messages/raw-messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UserRepository } from './user/user.repository';
import { UserController } from './user/user.controller';
import { DatabaseModule } from '../database/database.module';

/* istanbul ignore file */
@Module({
  controllers: [MessagesController, UserController],
  providers: [
    { provide: IMessagesRepository, useClass: MessagesRepository },
    UserRepository,
  ],
  imports: [
    RawMessagesModule,
    //TypeOrmModule.forFeature([User]),
    DatabaseModule,
  ],
  // exports: [TypeOrmModule], // export typeorm module to use generated repository in other modules
})
export class MessagesModule {}
