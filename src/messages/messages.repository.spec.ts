import { Test, TestingModule } from '@nestjs/testing';
import { MessagesRepository, Msg } from './messages.repository';

// https://medium.com/@sevicdev/testing-custom-repositories-nestjs-typeorm-3b20d4448db0
describe('test message repository', () => {
  let messageRepository: MessagesRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [MessagesRepository],
    }).compile();

    messageRepository = app.get<MessagesRepository>(MessagesRepository);
  });

  it('should be defined', () => {
    expect(messageRepository).toBeDefined();
  });

  it('returns an array of messages', async () => {
    const messages = await messageRepository.findAll();
    expect(messages).toBeInstanceOf(Array);
    expect(messages.map((_) => _.id)).toEqual(expect.arrayContaining([12, 15]));
  });

  it('should contain array elements', () => {
    expect([1, 2, 3, 4]).toEqual(expect.arrayContaining([1, 2, 3]));
  });

  it('saves message to file', async () => {
    const msg: Msg = { id: '33', content: 'it is 33!' };

    await messageRepository.create(msg.id, msg.content);

    const messages = await messageRepository.findAll();
    expect(messages).toBeInstanceOf(Array);
    expect(messages).toContainEqual(msg);
  });
});
