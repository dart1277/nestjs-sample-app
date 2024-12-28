import { Module } from '@nestjs/common';
import { RawMessagesService } from './raw-messages.service';

@Module({ providers: [RawMessagesService], exports: [RawMessagesService] })
export class RawMessagesModule {}
