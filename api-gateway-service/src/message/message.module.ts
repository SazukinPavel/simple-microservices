import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';
import { MessageController } from './message.controller';

@Module({
  controllers: [MessageController],
  imports: [
    ClientsModule.register([
      {
        name: config.messageServiceName,
        transport: Transport.TCP,
        options: {
          port: +process.env.MESSAGE_SERVICE_PORT,
          host: process.env.MESSAGE_SERVICE_HOST,
        },
      },
    ]),
  ],
})
export class MessageModule {}
