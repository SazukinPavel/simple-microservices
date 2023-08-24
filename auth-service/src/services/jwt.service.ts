import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  sign(data) {
    return sign(data, this.configService.get('AUTH_SERVICE_SECRET_KEY'), {
      expiresIn: '7d',
    });
  }

  verify(token: string) {
    return verify(token, this.configService.get('AUTH_SERVICE_SECRET_KEY'));
  }
}
