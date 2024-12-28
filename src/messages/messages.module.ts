import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

/* istanbul ignore file */
@Module({
  controllers: [MessagesController],
})
export class MessagesModule {}
