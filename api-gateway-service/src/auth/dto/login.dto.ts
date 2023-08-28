import { IsString } from 'class-validator';
import { LoginDto } from '@common/dto/auth/';

export class LoginApiDto implements LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
