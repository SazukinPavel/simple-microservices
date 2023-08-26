import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import config from 'src/config';
import AuthResponseDto from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.authServiceName) private readonly authClient: ClientProxy,
  ) {}

  me(req: Request) {
    const token = req.headers['authorization'];

    const pattern = { cmd: 'me' };
    return this.authClient.send<AuthResponseDto, string>(
      pattern,
      token?.split(' ')[1],
    );
  }

  register(dto: LoginDto) {
    const pattern = { cmd: 'register' };
    return this.authClient.send<AuthResponseDto, LoginDto>(pattern, dto);
  }

  login(dto: RegisterDto) {
    const pattern = { cmd: 'login' };
    return this.authClient.send<AuthResponseDto, LoginDto>(pattern, dto);
  }
}
