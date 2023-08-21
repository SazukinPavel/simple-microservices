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

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    const pattern = { cmd: 'delete' };
    return this.client.send<any, string>(pattern, id);
  }

  @Put()
  updateTodo(@Body() todo: Todo) {
    const pattern = { cmd: 'update' };
    return this.client.send<any, Todo>(pattern, todo);
  }
}
