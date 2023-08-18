import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';

@Module({
  controllers: [TodosController],
  imports: [
    ClientsModule.register([
      { name: config.todosServiceName, transport: Transport.TCP, options: { port: 8080 } },
    ]),
  ]
})
export class TodosModule { }
