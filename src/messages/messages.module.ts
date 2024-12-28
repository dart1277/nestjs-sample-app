import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository, IMessagesRepository } from './messages.repository';

/* istanbul ignore file */
@Module({
  controllers: [MessagesController],
  providers: [{ provide: IMessagesRepository, useClass: MessagesRepository }],
})
export class MessagesModule {}
