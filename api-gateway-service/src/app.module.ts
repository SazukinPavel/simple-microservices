import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TodosModule,
    LogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ]
})
export class AppModule { }
