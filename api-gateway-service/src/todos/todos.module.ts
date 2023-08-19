import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';

@Module({
  controllers: [TodosController],
  imports: [
    ClientsModule.register([
      { name: config.todosServiceName, transport: Transport.TCP, options: { port: +process.env.TODOS_SERVICE_PORT, host: process.env.TODOS_SERVICE_HOST } },
    ]),

  ]
})
export class TodosModule { }
