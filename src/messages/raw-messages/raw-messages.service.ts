import { Injectable } from '@nestjs/common';

@Injectable()
export class RawMessagesService {
  getRawMessage(): string {
    return 'raw-message';
  }
}
