import {
  Controller,
  Get,
  Logger,
  Param,
  Headers,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { CreateMessageDto } from './model/create-message.dto';
import { IMessagesRepository, Msg } from './messages.repository';

@Controller('messages')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name, {
    timestamp: true,
  });

  constructor(@Inject(IMessagesRepository) private repo: IMessagesRepository) {}

  @Get(':id')
  async getMessages(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
    @Headers('Authorization') auth?: string,
  ) {
    this.logger.log(`Getting messages from ${id}`);
    this.logger.log(`Getting header ${auth}`);
    this.logger.log(`Getting headers ${Object.keys(headers)}`);
    const map = new Map<string, string>(Object.entries(headers));
    const authorization2 = map.get('authorization');
    if (!authorization2) {
      throw new UnauthorizedException('Not authorized access');
    }
    const msg = await this.repo.findOne(id);
    if (!msg) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return msg!;
  }

  @Post(':id')
  //@UsePipes(new ValidationPipe({ transform: true }))
  async createMessage(
    @Body() dto: CreateMessageDto,
    @Param('id') id: string,
  ): Promise<Msg> {
    this.logger.log(dto);
    this.logger.log(`Creating message with id ${id}`);
    return this.repo.create(id, dto.content);
  }

  @Get()
  async findAll(): Promise<Msg[]> {
    return this.repo.findAll();
  }
}
