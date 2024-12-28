import { Test, TestingModule } from '@nestjs/testing';
import { RawMessagesService } from './raw-messages.service';

describe('RawMessagesService', () => {
  let service: RawMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RawMessagesService],
    }).compile();

    service = module.get<RawMessagesService>(RawMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
