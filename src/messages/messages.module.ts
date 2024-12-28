import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository, IMessagesRepository } from './messages.repository';
import { RawMessagesModule } from './raw-messages/raw-messages.module';

/* istanbul ignore file */
@Module({
  controllers: [MessagesController],
  providers: [{ provide: IMessagesRepository, useClass: MessagesRepository }],
  imports: [RawMessagesModule],
})
export class MessagesModule {}
