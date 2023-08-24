import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import config from 'src/config';
import { LoginDto } from './dto/login.dto';
import AuthResponseDto from './dto/auth-response.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(config.authServiceName) private readonly authClient: ClientProxy,
  ) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    const pattern = { cmd: 'login' };
    return this.authClient.send<AuthResponseDto, LoginDto>(pattern, dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    const pattern = { cmd: 'register' };
    return this.authClient.send<AuthResponseDto, LoginDto>(pattern, dto);
  }

  @Post('me')
  me(@Req() req: Request) {
    const token = req.headers['authorization'];

    const pattern = { cmd: 'me' };
    return this.authClient.send<AuthResponseDto, string>(
      pattern,
      token?.split(' ')[1],
    );
  }
}
