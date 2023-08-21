import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async get() {
    return { result: true, data: await this.todosRepository.find() };
  }

  async add(todo: Todo) {
    const newTodo = this.todosRepository.create({ ...todo });

    const data = await this.todosRepository.save(newTodo);

    return { result: true, data };
  }

  async update(todo: Todo) {
    const data = await this.todosRepository.update(todo.id, { ...todo });

    return { result: true, data };
  }

  async delete(id: string) {
    await this.todosRepository.delete(id);

    return { result: true };
  }
}
