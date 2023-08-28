import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import Request from 'src/types/Request';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginApiDto } from './dto/login.dto';
import { RegisterApiDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginApiDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterApiDto) {
    return this.authService.register(dto);
  }

  @Post('me')
  @UseGuards(AuthGuard)
  me(@Req() req: Request) {
    return req.auth;
  }
}
