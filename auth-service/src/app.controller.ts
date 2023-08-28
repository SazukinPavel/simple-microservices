import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from '@common/dto/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'login' })
  login(dto: LoginDto) {
    return this.appService.login(dto);
  }

  @MessagePattern({ cmd: 'register' })
  register(dto: RegisterDto) {
    return this.appService.register(dto);
  }

  @MessagePattern({ cmd: 'me' })
  me(token: string) {
    return this.appService.me(token);
  }
}
