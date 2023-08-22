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
import { AddMessageDto } from './dto/add-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import Message from 'src/types/Message';

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
  addMessage(@Body() dto: AddMessageDto) {
    const pattern = { cmd: 'add' };
    return this.client.send<any, AddMessageDto>(pattern, dto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: string) {
    const pattern = { cmd: 'delete' };
    return this.client.send<any, string>(pattern, id);
  }

  @Put()
  updateMessage(@Body() dto: UpdateMessageDto) {
    const pattern = { cmd: 'update' };
    return this.client.send<any, UpdateMessageDto>(pattern, dto);
  }
}
