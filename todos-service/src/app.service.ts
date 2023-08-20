import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async getTodos() {
    return { result: await this.todosRepository.find() };
  }

  async addTodo(todo: Todo) {
    const newTodo = this.todosRepository.create({ ...todo });

    console.log(todo, newTodo);

    await this.todosRepository.save(newTodo);

    return { result: true };
  }
}
