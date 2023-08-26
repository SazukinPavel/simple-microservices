import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/config';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    ClientsModule.register([
      {
        name: config.authServiceName,
        transport: Transport.TCP,
        options: {
          port: +process.env.AUTH_SERVICE_PORT,
          host: process.env.AUTH_SERVICE_HOST,
        },
      },
    ]),
  ],
})
export class AuthModule {}
