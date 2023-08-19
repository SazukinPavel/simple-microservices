import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    TodosModule,
    LogsModule,
  ]
})
export class AppModule { }
