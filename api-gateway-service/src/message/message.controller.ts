import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import config from 'src/config';
import { Message } from '@common/message';
import { AddMessageApiDto } from './dto/add-message.dto';
import { AddMessageDto, UpdateMessageDto } from '@common/dto/message';
import { ServiceRequest } from '@common/base';
import { UpdateMessageApiDto } from './dto/update-message.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '@common/user';
import { AuthGuard } from '../guards/auth.guard';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(
    @Inject(config.messageServiceName) private readonly client: ClientProxy,
  ) {}

  @Get()
  getMessage(@GetUser() user: User) {
    const pattern = { cmd: 'get' };
    return this.client.send<Message[], ServiceRequest<any>>(pattern, {
      user,
      data: {},
    });
  }

  @Post()
  addMessage(@Body() dto: AddMessageApiDto, @GetUser() user: User) {
    const pattern = { cmd: 'add' };
    return this.client.send<any, ServiceRequest<AddMessageDto>>(pattern, {
      user,
      data: dto,
    });
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: string, @GetUser() user: User) {
    const pattern = { cmd: 'delete' };
    return this.client.send<any, ServiceRequest<string>>(pattern, {
      data: id,
      user,
    });
  }

  @Put()
  updateMessage(@Body() dto: UpdateMessageApiDto, @GetUser() user: User) {
    const pattern = { cmd: 'update' };
    return this.client.send<any, ServiceRequest<UpdateMessageDto>>(pattern, {
      user,
      data: dto,
    });
  }
}
