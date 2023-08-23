import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';

@Module({
  providers: [LogsService],
  imports: [
    ClientsModule.register([
      { name: config.logsServiceName, transport: Transport.TCP, options: { port: +process.env.LOGS_SERVICE_PORT, host: process.env.LOGS_SERVICE_HOST } },
    ]),
  ]
})
export class LogsModule { }
