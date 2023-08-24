import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  crypt(val: string) {
    return hash(val, +this.configService.get('AUTH_SERVICE_CRYPT_SALT'));
  }

  compare(val: string, hash: string) {
    return compare(val, hash);
  }
}
