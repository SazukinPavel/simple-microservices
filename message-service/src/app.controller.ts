import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Message } from '@common/message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get' })
  get() {
    return this.appService.get();
  }

  @MessagePattern({ cmd: 'add' })
  add(message: Message) {
    return this.appService.add(message);
  }

  @MessagePattern({ cmd: 'update' })
  update(message: Message) {
    return this.appService.update(message);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(id: string) {
    return this.appService.delete(id);
  }
}
