import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { Todo } from './entities/todo.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get' })
  get() {
    return this.appService.get();
  }

  @MessagePattern({ cmd: 'add' })
  add(todo: Todo) {
    return this.appService.add(todo);
  }

  @MessagePattern({ cmd: 'update' })
  update(todo: Todo) {
    return this.appService.update(todo);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(id: string) {
    return this.appService.delete(id);
  }
}
