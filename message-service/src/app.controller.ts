import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AddMessageDto, UpdateMessageDto } from '@common/dto/message';
import { ServiceRequest } from '@common/base';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get' })
  get({ user }: ServiceRequest<any>) {
    return this.appService.get(user);
  }

  @MessagePattern({ cmd: 'add' })
  add({ user, data }: ServiceRequest<AddMessageDto>) {
    return this.appService.add(data, user);
  }

  @MessagePattern({ cmd: 'update' })
  update({ user, data }: ServiceRequest<UpdateMessageDto>) {
    return this.appService.update(data, user);
  }

  @MessagePattern({ cmd: 'delete' })
  delete({ data, user }: ServiceRequest<string>) {
    return this.appService.delete(data, user);
  }
}
