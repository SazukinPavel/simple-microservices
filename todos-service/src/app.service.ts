import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { Cache, Store } from 'cache-manager';
import Todo from './types/Todo';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

  async getTodos() {
    return { result: await this.cacheManager.get<Todo[]>('todos') };
  }

  async addTodo(todo: Todo) {
    let todos = (await this.getTodos()) as unknown as Todo[]

    if (!todos || !todos.length) {
      todos = []
    }

    todos.push(todo)

    await this.cacheManager.set('todos', todos, 180000)

    return { result: true }
  }
}
