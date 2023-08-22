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
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

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
  addTodo(@Body() dto: AddTodoDto) {
    const pattern = { cmd: 'add' };
    return this.client.send<any, AddTodoDto>(pattern, dto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    const pattern = { cmd: 'delete' };
    return this.client.send<any, string>(pattern, id);
  }

  @Put()
  updateTodo(@Body() todo: UpdateTodoDto) {
    const pattern = { cmd: 'update' };
    return this.client.send<any, UpdateTodoDto>(pattern, todo);
  }
}
