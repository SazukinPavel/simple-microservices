import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import Todo from './types/Todo';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ cmd: 'get' })
  get() {
    return this.appService.getTodos();
  }

  @MessagePattern({ cmd: 'add' })
  add(data: Todo) {
    return this.appService.addTodo(data);
  }
}
