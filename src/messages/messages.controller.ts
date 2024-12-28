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
} from '@nestjs/common';
import { CreateMessageDto } from './model/create-message.dto';

@Controller('messages')
export class MessagesController {
  private readonly logger = new Logger(MessagesController.name, {
    timestamp: true,
  });

  @Get(':id')
  getMessages(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
    @Headers('Authorization') auth?: string,
  ) {
    this.logger.log(`Getting messages from ${id}`);
    this.logger.log(`Getting header ${auth}`);
    this.logger.log(`Getting headers ${Object.keys(headers)}`);
    const map = new Map<string, string>(Object.entries(headers));
    const authorization2 = map.get('authorization');
    return { data: id, header: authorization2 };
  }

  @Post(':id')
  //@UsePipes(new ValidationPipe({ transform: true }))
  createMessage(
    @Body() dto: CreateMessageDto,
    @Param('id') id: string,
  ): CreateMessageDto {
    this.logger.log(dto);
    this.logger.log(`Creating message with id ${id}`);
    return dto;
  }
}
