import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import config from 'src/config';
import { Message } from '@common/message';
import { AddMessageApiDto } from './dto/add-message.dto';
import { AddMessageDto, UpdateMessageDto } from '@common/dto/message';
import { UpdateMessageApiDto } from './dto/update-message.dto';

@Controller('messages')
export class MessageController {
  constructor(
    @Inject(config.messageServiceName) private readonly client: ClientProxy,
  ) {}

  @Get()
  getMessage() {
    const pattern = { cmd: 'get' };
    return this.client.send<Message[]>(pattern, {});
  }

  @Post()
  addMessage(@Body() dto: AddMessageApiDto) {
    const pattern = { cmd: 'add' };
    return this.client.send<any, AddMessageDto>(pattern, dto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: string) {
    const pattern = { cmd: 'delete' };
    return this.client.send<any, string>(pattern, id);
  }

  @Put()
  updateMessage(@Body() dto: UpdateMessageApiDto) {
    const pattern = { cmd: 'update' };
    return this.client.send<any, UpdateMessageDto>(pattern, dto);
  }
}
