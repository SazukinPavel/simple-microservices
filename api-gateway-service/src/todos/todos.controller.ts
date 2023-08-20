import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import config from 'src/config';
import Todo from 'src/types/Todo';

@Controller('todos')
export class TodosController {
  constructor(
    @Inject(config.todosServiceName) private readonly client: ClientProxy,
  ) {}

  @Get()
  getTodos() {
    const pattern = { cmd: 'get' };
    return this.client.send<Todo[]>(pattern, {});
  }

  @Post()
  addTodo(@Body('message') message: string) {
    const pattern = { cmd: 'add' };
    const todo = { message };
    return this.client.send<any, Todo>(pattern, todo);
  }
}
